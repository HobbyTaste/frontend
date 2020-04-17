import Button from '@material-ui/core/Button';
import React from 'react';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import style from './Buttons.css';

/*у каждого пользователя должен быть список хобби. При нажатии на кнопку в стор должно добавлятся хобби.
при повторном нажатии удаляться из своих хобби.
 */
const isUserHave = false;

const useStyles = theme => ({
    root: {
    },
    button:{
        display: 'flex',
        marginLeft: '0px',
        border: '1px solid #b7b7b7',
        background: '#EDECE8',
        borderRadius: '4px',
        textTransform: 'none',
        maxHeight: '36px',
    }
});

class ButtonInMyHobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserHave: props.status
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({isUserHave: !this.state.isUserHave});
    }
    render() {
        const classes = useStyles()
        return (<div className={classes.root}>
                <Button style={classes.button} onClick={this.handleClick}> <p className={style.text + ' ' + style.textAddMyHobby}>В мои хобби</p>
                    {this.state.isUserHave ? <p className={style.iconHave}><BookmarkIcon /> </p> : <p className={style.iconNot}><BookmarkBorderIcon />  </p>}
                </Button>
            </div>
        )
    }
}

export default ButtonInMyHobby;
