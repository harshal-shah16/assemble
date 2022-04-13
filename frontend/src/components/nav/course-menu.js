import React, {useCallback, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {statuses} from "../../store/state-types";
import {courseActions, courseSelectors, courseThunks} from "../../store/course-slice";
import {useHistory, useParams} from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 6),
        margin: theme.spacing(1, 1),
        width: '100%'
    }
}))

const CourseMenu = () => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const courses = useSelector(courseSelectors.selectAll);
    const coursesStatus = useSelector(state => state.courses.status)
    const user = useSelector(state => state.session.user);
    const getCourses = useCallback(() => dispatch(courseThunks.findAllEnrollments()),
                                   [dispatch, user.userId])
    const {feedId} = useParams();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const findCourseAndSelect = () => {
        let feedIndex = -1;
        const courseIndex = feedId ? courses.findIndex(
            c => {
                feedIndex = c.feeds.findIndex(f => f.feedId === Number.parseInt(feedId))
                return feedIndex !== -1
            }
        ) : 0;
        history.push(
            `/feed/${courses[courseIndex].feeds[feedIndex === -1 ? 0 : feedIndex].feedId}`);
        selectCourse(courseIndex);
    };

    const selectCourse = (courseIndex) => {
        dispatch(courseActions.courseSelected(courses[courseIndex]));
        setSelectedIndex(courseIndex);
    }

    useEffect(() => {
        if (user.token) {
            if (coursesStatus === statuses.SUCCESS
                && courses.length > 0 && courses[0].feeds.length > 0) {
                findCourseAndSelect();
            } else if (coursesStatus === statuses.IDLE) {
                getCourses()
            }
        }
    }, [coursesStatus, dispatch, getCourses, feedId, user.token])

    return (
        <>
            <Button className={classes.root} aria-controls="class-menu" aria-haspopup="true"
                    onClick={handleClick}>
                {courses[selectedIndex] ? courses[selectedIndex].courseName : 'Courses'}
            </Button>
            <Menu
                id="class-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    courses.map((course, index) => (
                        <MenuItem
                            key={course.courseId}
                            onClick={() => {
                                history.push(`${course.feeds[0].feedId}`);
                                selectCourse(index);
                                setAnchorEl(null);
                            }}
                            selected={index === selectedIndex}
                        >
                            {course.courseName}
                        </MenuItem>
                    ))
                }

                {
                    (!courses || courses.length === 0) &&
                    <MenuItem
                        onClick={() =>
                            window.open(
                                'http://catalog.northeastern.edu/graduate/expenses/tuition-fees/')
                        }

                    >No courses to show...</MenuItem>
                }
            </Menu>
        </>
    );
}

export default CourseMenu
