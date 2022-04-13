import React, {useEffect, useState} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CourseMenu from "./course-menu";
import {FaArrowLeft, FaArrowRight} from "react-icons/all";
import {Drawer, Typography, useTheme} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import useSideNavStyles from "./side-nav-styles";
import {useHistory, useParams} from "react-router";

import {useSelector} from "react-redux";

const SideNav = ({open, onClose}) => {
    const history = useHistory();
    const classes = useSideNavStyles();
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {selectedCourse} = useSelector(state => state.courses);
    const {feedId} = useParams();

    useEffect(() => {
        if (selectedCourse?.feeds?.length > 0) {
            setSelectedIndex(
                selectedCourse.feeds.findIndex(f => f.feedId === Number.parseInt(feedId)));
        }
    }, [selectedCourse, feedId]);

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <CourseMenu/>
                    <IconButton className={classes.drawerCollapse} onClick={onClose}>
                        {theme.direction === 'ltr' ? <FaArrowLeft/> : <FaArrowRight/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>

                    {
                        selectedCourse?.feeds.map((feed, index) => (
                            <ListItem
                                className={selectedIndex === index ? classes.selected : ''}
                                button
                                key={feed.feedId}
                                selected={selectedIndex === index}
                                onClick={() => {
                                    history.push(
                                        `/feed/${feed.feedId}`);
                                    setSelectedIndex(index)
                                }}
                            >
                                <ListItemText primary={feed.feedName}/>
                            </ListItem>
                        ))
                    }
                    {
                        (!selectedCourse || !selectedCourse?.feeds
                         || selectedCourse?.feeds.length === 0) &&
                        <Typography variant={'h6'}>No feeds to show...</Typography>
                    }

                </List>
            </Drawer>
        </>
    )
}

export default SideNav
