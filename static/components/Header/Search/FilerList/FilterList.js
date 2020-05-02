import  React, {Component} from 'react'
import style from '../Search.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { setSearchWord, setSearchWordSuccess } from '../../../../redux/actions/searchActions';
import { connect } from 'react-redux';
import { compose } from 'redux';

const useStyles = theme => ({
    searchButton: {
    display: 'inline-block',
    float: 'right',
    height:'30px',
    alignItems: 'center',
    padding: '0px',
    marginRight: '11px',
        minWidth: '22px',
    border: 'none',
    cursor: 'pointer',
    color:'#FFFFFF',
    background: '#EDECE8',
}
});
const StyledMenu = withStyles({
    paper: {
        marginTop: '5px',
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
                "Рисование", "Футбол", "Волейбол"
            ],
            items: [],
            anchorEl: null,
            isShow: false,
            word: '',
            isSubmit: false,
        };
        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        if (this.state.word != ''){
            this.props.onSearch(this.state.word);
            this.setState({word: ''});
            this.setState({items: null, isShow: false})
            this.props.history.push('/search');
        }
        else {
            this.setState({word: 'Введите запрос'});
        }

    }

     handleClick(event, item) {
        console.log(item);
         this.setState({AnchorEl: event.currentTarget});
         this.props.onSearch(item);

    }

    handleClose (event) {
        this.setState({isShow: false});
        this.setState({AnchorEl: null});
        this.setState({word: ''});
    }

    filterList(event){
        this.setState({word: event.target.value});
        let updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        let isShowSet=false;
        if (event.target.value){
            isShowSet = true;
        }
        this.setState({items: updatedList, isShow: isShowSet});
    }

    componentWillMount(){
        this.setState({items: this.state.initialItems})
    }
    render(){
        const onClick_= this.handleClick;
        const onClose = this.handleClose;
        const classes = useStyles();
        return (
            <div className={style.searcher}>
                <div className={style.withoutList}>
                <form className={style.form}>
                    <fieldset className={style.fieldSet}>
                        <input type="text" className={style.inputSearch} placeholder="Search..." id="searchInput" value = {this.state.word} onChange={this.filterList}/>
                    </fieldset>
                </form>
               <Button style={classes.searchButton} value="" onClick={this.handleSearch}>
                   <SearchIcon style={{ fontSize: 30 }} /></Button>
                </div>
                <div>
                { (this.state.isShow) &&
                    <ul className={style.list}>
                    {
                        this.state.items.map(function(item) {
                            return <li className={style.itemList} data-category={item} key={item} onClick={onClose}>
                                <Link to='/search' className={style.link} onClick={(e) => onClick_(e, item)} >
                                {item}</Link></li>
                        })
                    }
                    </ul>

                }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSearch: (word) => dispatch(setSearchWord(word)),
});

export default compose(connect(null, mapDispatchToProps),(withStyles(useStyles,{withTheme: true})), withRouter)(FilteredList);
