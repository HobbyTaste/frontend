import React from 'react';
import RegistrationNew from '../../../Registration/RegistrationNew';
import LoginNew from '../SignIn/SignInNew';
import Registration from '../../../Registration/Registration';


const SignForm =(props) => {
    const [isRegistration, setRegistration] = React.useState(false);
    const [isProvider, setProvider ] = React.useState(false);
    const handleChangeForm = () => {
        setRegistration(!isRegistration);
    };
    const handleChangeUser = () => {
        setProvider(!isProvider);
    };
    const handleGoSignInUser = () => {
        setProvider(false);
        setRegistration(false);
    };
    const handleGoSignInProvider=() => {
        setProvider(true);
        setRegistration(false);
    };

    const handleSetUser = () => {
        setProvider(false);
    };

    const handleSetProvider = () => {
        setProvider(true);
    };

    return (<div>{isRegistration ? <RegistrationNew isProvider={isProvider} onClickUserReg={handleSetUser} onClickProviderReg={handleSetProvider}
            onClickProviderSign = {handleGoSignInProvider} onClickUserSign={handleGoSignInUser}/> :
    <LoginNew isProvider={isProvider} onCLickRegistation = {handleChangeForm} onChangeSign = {handleChangeUser} />}
        </div>
        );
}
export default SignForm;
