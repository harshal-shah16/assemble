import React from 'react';
import MaterialTable, {MTableToolbar} from 'material-table'
import {useDispatch} from "react-redux";
import {courseThunks} from "../../store/course-slice";
import Grid from "@material-ui/core/Grid";
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import ChildCareIcon from '@material-ui/icons/ChildCare';


const EnrollmentManager = ({course}) => {
    const dispatch = useDispatch();

    const columns = [
        {
            title: "User ID", field: "userId", editable: "never"
        },
        {
            title: "Email", field: "email",
            validate: (rowData) => rowData.email?.includes('@') ? '' : 'Email must contain "@" '
        },
        {
            title: "Role", field: "role", lookup: {STUDENT: "STUDENT", INSTRUCTOR: "INSTRUCTOR"},
            validate: (rowData) => Boolean(rowData.role),
            render: (rowData => rowData.role === "INSTRUCTOR" ?
                <Grid container><AccountBoxOutlinedIcon/>{rowData.role}</Grid>
                :
                <Grid container><ChildCareIcon/>{rowData.role}</Grid>)
        },
        {
            title: "First Name", field: "firstName", editable: "never"
        },
        {
            title: "Last Name", field: "lastName", editable: "never"
        },

    ]

    return (

        <div>
            <MaterialTable
                style={{marginTop: '20px'}}
                title={`${course.courseName} Enrollment Manager`}
                columns={columns}
                data={course.courseRoles.map(cr => ({...cr.user, role: cr.role}))}
                editable={{
                    onRowAdd: (newRow) => new Promise((resolve, reject) => {
                        dispatch(courseThunks.createEnrollmentForUser({
                            courseId: course.courseId,
                            email: newRow.email,
                            courseRole: {
                                role: newRow.role
                            }
                        }))
                        resolve()
                    }),
                    onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                        dispatch(courseThunks.deleteEnrollmentForUser({
                            courseId: course.courseId,
                            userId: selectedRow.userId
                        }))
                        resolve()
                    }),

                }}
                options={{
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                }}
                localization={{
                    body: {
                        addTooltip: "Enroll student",
                        deleteTooltip: "Unenroll student",
                        emptyDataSourceMessage:
                        // coursesStatus === statuses.LOADING
                        // ? false
                        // :
                            "No records to display",
                        editRow: {
                            deleteText: "Are you sure you want to unenroll this student?",
                        },
                    },
                }}
                components={{
                    Toolbar: props => (
                        <div style={{backgroundColor: '#1AA260'}}>
                            <MTableToolbar {...props} />
                        </div>
                    ),
                }}
            />

        </div>
    );
}

export default EnrollmentManager;
