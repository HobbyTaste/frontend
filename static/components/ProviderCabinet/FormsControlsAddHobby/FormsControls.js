import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 10px'
    },
    textField: {
        width: '100%',
    },
    select: {
        textAlign: 'left'
    },
    selectContainer: {
        marginTop: '10px',
        marginBottom: '5px'
    }
}));

export const Input = (props) => {
    const classes = useStyles();
    return (
            <div className={classes.container}>
                <TextField
                    id="outlined-textarea"
                    label={props.placeholder}
                    className={classes.textField}
                    placeholder={props.placeholder}
                    multiline
                    margin="normal"
                    variant="outlined"
                    onChange = {props.onChange}
                    value = {props.value}
                />
        </div>
   );
};

export const MaterialsSelect = (props) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setAge(event.target.value);
    };

    return (
        <div className={classes.selectContainer}>
        <div className={classes.container}>
            <FormControl variant="outlined" className={classes.textField}>
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Категория хобби
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={props.onChange}
                    labelWidth={labelWidth}
                    className={classes.select}
                >
                    <MenuItem value="">
                        <em>Категория хобби</em>
                    </MenuItem>
                    <MenuItem value={'sport'}>Спорт</MenuItem>
                    <MenuItem value={'music'}>Музыка</MenuItem>
                    <MenuItem value={'travels'}>Путешествия</MenuItem>
                    <MenuItem value={'cookery'}>Кулинария</MenuItem>
                    <MenuItem value={'aquarium'}>Аквариумистика</MenuItem>
                    <MenuItem value={'needlework'}>Рукоделие</MenuItem>
                    <MenuItem value={'numismatics'}>Нумизматика</MenuItem>
                    <MenuItem value={'videogames'}>Видеоигры</MenuItem>
                    <MenuItem value={'photo'}>Фотография</MenuItem>
                    <MenuItem value={'drawing'}>Рисование</MenuItem>
                    <MenuItem value={'gardening'}>Садоводство</MenuItem>
                    <MenuItem value={'languages'}>Иностранные языки</MenuItem>
                    <MenuItem value={'floristry'}>Флористика</MenuItem>
                    <MenuItem value={'dogbreeding'}>Собаководство</MenuItem>
                    <MenuItem value={'cinema'}>Кино</MenuItem>
                    <MenuItem value={'autotuning'}>Автотюнинг</MenuItem>
                    <MenuItem value={'other'}>Другое</MenuItem>
                </Select>
            </FormControl>
        </div>
        </div>
    );
};