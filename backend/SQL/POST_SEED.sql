# TRUNCATE post
INSERT INTO post (
    SELECT ROWN,
           e.course_id,
           feed_id,
           e.user_id,
CONCAT('This is course ', cast(e.course_id as char),
CONCAT(' Post number ', ROWN)),
CONCAT('<h3>Here is the post body for post ', cast(ROWN as char),
CONCAT(
CONCAT('</h3><ul><li>This is for course ',
CONCAT(course_name,
CONCAT('</li><li>This is for feed ',
CONCAT(feed_name,
CONCAT('</li><li>And from username ',
CONCAT(first_name,
'</li></ul>')
))))))),
           DATE_SUB(NOW(), INTERVAL
                    u.user_id + 6 + (
                        SELECT ROW_NUMBER() over (PARTITION BY s2.course_id)
                        FROM feed v
                                 JOIN course_role s2 on v.course_id = s2.course_id
                        where s.user_id = s2.user_id
                          and v.feed_id = e.feed_id
                    )
                    DAY),
           NOW()
    FROM (SELECT v.course_id,
                 s2.user_id,
                 v.feed_id,
                 v.feed_name,
                 ROW_NUMBER() over (PARTITION BY s2.course_id) ROWN
          FROM feed v
                   JOIN course_role s2 on v.course_id = s2.course_id) e
             join user u on u.user_id = e.user_id
             JOIN course_role s on e.course_id = s.course_id and u.user_id = s.user_id
             join course c on e.course_id = c.course_id
    where not exists(select * from post where e.feed_id = post.post_id)
)
