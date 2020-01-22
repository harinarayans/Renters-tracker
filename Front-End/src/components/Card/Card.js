import React from 'react';
import { Divider, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Card.css';


const RentersCard = (props) => {
    let { isCardHeader, isHeaderDivider, isFooterDivider, isCardHeaderIcon, isCardHeaderMenu, isCardMedia, isCardContent, isCardFooterAction, title, subTitle, mediaFilePath, mediaTitle, cardContent, cardActionIcon } = props;
    return (
        <Card className="card">
            {
                isCardHeader &&
                <CardHeader
                    avatar={
                        isCardHeaderIcon &&
                        <Avatar>
                            <props.cardHeaderIcon />
                        </Avatar>
                    }
                    action={
                        isCardHeaderMenu &&
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title ? <b>{title}</b> : ''}
                    subheader={subTitle ? subTitle : ''}
                />
            }
            {isHeaderDivider && <Divider />}
            {
                isCardMedia &&
                <CardMedia
                    className="media"
                    component="img"
                    alt="Image not found"
                    height="140"
                    image={mediaFilePath}
                    title={mediaTitle}
                />
            }
            {
                isCardContent &&
                <CardContent>
                    {
                        typeof cardContent === 'object' ?
                            <props.cardContent /> : typeof cardContent === 'string' ?
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {cardContent}
                                </Typography> : null
                    }
                </CardContent>
            }
            {isFooterDivider && <Divider />}
            {
                isCardFooterAction && cardActionIcon ?
                    <CardActions disableSpacing>
                        <IconButton aria-label="share">
                            <props.cardActionIcon />
                        </IconButton>
                    </CardActions> : null
            }
        </Card>
    )
}

export default RentersCard;
