import  React, {Component} from 'react'
import style from '../Search.css';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LogoutUser from '../../LogoutUser/LogoutUser';
import LoginUser from '../../LoginUser/LoginUser';
import SearchIcon from '@material-ui/icons/Search';

/*
*   <ul className={style.list}>
            {
                props.items.map(function(item) {
                    return <li className={style.itemList} data-category={item} key={item}>  <Link to='/' className={style.link} >{item}</Link></li>
                })
            }
        </ul>*/

const useStyles = theme => ({
    button: {
        margin: '5px 0px',
        background: '#E9F0C0',
        color: '#739C3E',
        borderRadius: '4px',
        width: '94%',
        padding: '0',
        height: '75%',
        border:'none',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        letterSpacing: '0.16px',
        textAlign: 'center',
        textTransform: 'none',
    },
});
const StyledMenu = withStyles({
    paper: {
        marginTop: '5px',
        maxHeight: '484px',
        background: '#fff',
        width: '135px',
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.14)',
        borderRadius: '4px',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const List = (props) => {
    return (
        <ul className={style.list}>
            {
                props.items.map(function(item) {
                    return <li className={style.itemList} data-category={item} key={item} onClick={props.handleClose}>  <Link to='/search/sport' className={style.link} >{item}</Link></li>
                })
            }
        </ul>
            )
};

class FilteredList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialItems: [
                "Атлетика",
                "Аэробика",
                "Плавание",
                "Вязание",
                "Верховая езда",
                "Музыка",
                "Пение",
                "Рисование"
            ],
            items: [],
            anchorEl: null,
            isShow: false
        };
        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


     handleClick(event) {
         this.setState({AnchorEl: event.currentTarget});
    }

    handleClose () {
        this.setState({isShow: false});
        this.setState({AnchorEl: null});
    }

    filterList(event){
        let updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        let aa=false;
        if (event.target.value){
            aa = true;
        }
        this.setState({items: updatedList, isShow: aa});
    }

    componentWillMount(){
        this.setState({items: this.state.initialItems})
    }
    render(){

        const {classes} = this.props;
        return (
            <div className={style.searcher}>
                <form className={style.form}>
                    <fieldset className={style.fieldSet}>
                        <input type="text" className={style.inputSearch} placeholder="Search..." id="searchInput" onChange={this.filterList}/>
                    </fieldset>
                </form>

                <button className={style.buttonFind} value="" ><SearchIcon style={{ fontSize: 30 }} /></button>
                { (this.state.isShow) && <List items={this.state.items} handleClose = {this.handleClose}/>
                }
            </div>
        );
    }
}
export default withStyles(useStyles,{withTheme: true})(FilteredList);
