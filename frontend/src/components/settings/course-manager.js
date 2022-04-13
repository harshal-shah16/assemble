import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MaterialTable, {MTableToolbar} from "material-table";
import {useDispatch, useSelector} from "react-redux";
import {courseSelectors, courseThunks} from "../../store/course-slice";
import {statuses} from "../../store/state-types";
import {Chip, CircularProgress, Tooltip} from "@material-ui/core";
import FeedManager from "./feed-manager";
import {List, People, VisibilityOff} from '@material-ui/icons';
import {useHistory} from 'react-router';
import EnrollmentManager from './enrollment-manager';

const useStyles = makeStyles({
    loading: {
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 1,
    },
    courseNameStyle: {
        textDecoration: "none",
        color: "black",
        "&:hover": {
            fontWeight: 600,
        },
    },
});

const CourseManager = ({courseId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const courses = useSelector(courseSelectors.selectAll);
    const coursesStatus = useSelector((state) => state.courses.status);
    const getCourses = useCallback(
        () => dispatch(courseThunks.findAllEnrollments()),
        [dispatch, user.userId]
    );
    const coursesManageable = courses.filter(
        (course) =>
            course.courseRoles.find(
                (cr) => cr.user.userId === user.userId && cr.role === "INSTRUCTOR"
            ) !== undefined
    );

    const [data, setData] = useState([]);

    useEffect(() => {
        if (user.token && coursesStatus === statuses.IDLE) {
            getCourses();
        }
    }, [coursesStatus, dispatch, getCourses, user.token]);

    useEffect(() => {
        setData(coursesManageable.map((o) => ({...o})));
    }, [courses, coursesStatus]);

    const columns = [
        {title: "Course ID", field: "courseId", editable: "never"},
        {
            title: "Course Name",
            field: "courseName",
            validate: (rowData) => Boolean(rowData.courseName),
            render: (rowData) => rowData.courseName,
        },
        {
            title: "Course Status",
            field: "status",
            editable: "never",
            initialEditValue: 1,
            lookup: {
                1: <Chip label="Active" style={{backgroundColor: "limegreen"}}/>,
                0: <Chip label="Inactive" style={{backgroundColor: "#d32f2f"}}/>
            },
            align: "center",
        },
        {
            title: "Created At",
            field: "createdAt",
            editable: "never",
            render: (rowData) =>
                new Date(
                    new Date(rowData.createdAt).toUTCString().toLocaleString()
                ).toLocaleString(),
        },
        {
            title: "Updated At",
            field: "updatedAt",
            editable: "never",
            render: (rowData) =>
                new Date(
                    new Date(rowData.updatedAt).toUTCString().toLocaleString()
                ).toLocaleString(),
        },
    ];

    return (
        <div>
            {coursesStatus === statuses.LOADING && (
                <CircularProgress className={classes.loading} size={30}/>
            )}

            <h1 align="center">Course Manager</h1>
            <h4 align="center">
                This view shows a list of all of the courses managed by you
            </h4>
            <MaterialTable
                title="Manage Courses"
                columns={columns}
                data={coursesStatus === statuses.LOADING ? [] : data}
                editable={{
                    isEditable: (rowData) => rowData.status === 1,
                    isDeletable: (rowData) => rowData.status === 1,

                    onRowAdd: (newRow) =>
                        new Promise((resolve, reject) => {
                            dispatch(
                                courseThunks.createCourseForUser({
                                    course: {courseName: newRow.courseName},
                                })
                            );
                            resolve();
                        }),
                    onRowUpdate: (updatedRow, oldRow) =>
                        new Promise((resolve, reject) => {
                            dispatch(
                                courseThunks.updateCourseById({
                                    courseId: oldRow.courseId,
                                    course: {
                                        courseId: oldRow.courseId,
                                        courseName: updatedRow.courseName,
                                        status: updatedRow.status,
                                    },
                                })
                            );
                            resolve();
                        }),
                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            dispatch(
                                courseThunks.updateCourseById({
                                    courseId: selectedRow.courseId,
                                    course: {
                                        courseId: selectedRow.courseId,
                                        courseStatus: 0,
                                    },
                                })
                            );
                            resolve();
                        }),
                }}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                }}
                localization={{
                    body: {
                        addTooltip: "Create course",
                        deleteTooltip: "Turn Inactive",
                        emptyDataSourceMessage:
                            coursesStatus === statuses.LOADING
                                ? false
                                : "No records to display",
                        editRow: {
                            deleteText: "Are you sure you want to deactivate this course?",
                        },
                    },
                }}
                components={{
                    Toolbar: (props) => (
                        <div style={{backgroundColor: "#e8eaf5"}}>
                            <MTableToolbar {...props} />
                        </div>
                    ),
                }}
                detailPanel={[
                    {
                        icon: () => <Tooltip title={'Manage Course Details'}><List/></Tooltip>,
                        openIcon: () => <Tooltip title={'Hide Course Details'}><VisibilityOff/></Tooltip>,
                        render: (rowData) =>
                            <div style={{padding: "10px 10px"}}>
                                <FeedManager rowData={rowData}/>
                                <EnrollmentManager course={rowData}/>
                            </div>
                    },
                ]}
            />
        </div>
    );
};

export default CourseManager;
