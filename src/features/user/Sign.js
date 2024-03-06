
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useRef } from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { signIn, signUp } from './userApi.js';
import { useDispatch } from 'react-redux';
import { userIn } from './userSlice.js';
import { useNavigate } from 'react-router-dom';






export const Sign = () => {

    let [variable, setVariable] = useState(false);
    let [notExist, setNotExist] = useState(false);
    let [ifExist, setIfExist] = useState(false);

    const toast = useRef(null);
    let navigate = useNavigate();

    let dispatch = useDispatch();
    const changeVariableFalse = (event) => {
        event.preventDefault();
        setVariable(false);
    };
    const changeVariableTrue = (event) => {
        event.preventDefault();
        setVariable(true);
    };



    let formCheckSignUp = yup.object().shape({
        userName: yup.string().required("שדה חובה").min(2, "שם קצר מדי"),
        email: yup.string().required("שדה חובה").email("כתובת מייל לא תקינה").matches(/@gmail.com$/, "כתובת מייל לא תקינה"),
        password: yup.string().required("שדה חובה").matches(/^(?=(?:\D*\d){2})(?=(?:[^a-zA-Z]*[a-zA-Z]){4})/, "הסיסמה צריכה לכלול 4 אותיות ו-2 מספרים")
    })
    let formCheckLogin = yup.object().shape({
        email2: yup.string().required("שדה חובה").email("כתובת מייל לא תקינה").matches(/@gmail.com$/, "כתובת מייל לא תקינה"),
        password2: yup.string().required("שדה חובה").matches(/^(?=(?:\D*\d){2})(?=(?:[^a-zA-Z]*[a-zA-Z]){4})/, "הסיסמה שגויה")
    })

    const { control, handleSubmit, register, formState: { errors }, reset } = useForm({ mode: "login", resolver: yupResolver(variable ? formCheckSignUp : formCheckLogin) });

    const showSignUp = () => {
        toast.current.show({ severity: 'success', detail: 'הצטרפת בהצלחה למאגר הלקוחות שלנו' });
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    const showSignIn = () => {
        toast.current.show({ severity: 'success', detail: `נכנסת בהצלחה` });
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error"> </small>;
    };


    ////הרשמה
    const saveSignUp = async (data) => {
        try {
            let user = { userName: data.userName, email: data.email, password: data.password }
            let addUser = await signUp(user);
            dispatch(userIn(addUser));
            showSignUp();
            setNotExist(false);
            reset();
        }
        catch (err) {
            setIfExist(true);
        }
    }

    ////כניסה
    const saveLogin = async (details) => {
        try {
            let user = { email: details.email2, password: details.password2 }
            let newUser = await signIn(user);
            dispatch(userIn(newUser))
            showSignIn();
            setNotExist(false);
            setIfExist(false);
            reset();
        }
        catch (err) {
            setNotExist(true);
        }
    }

    return (<>
        <div style={{ direction: "rtl", margin: "10%", marginRight: "40%", marginTop: "5%" }}>
            <div className="card flex justify-content-center w-6">
                <div className="card flex justify-content-center">
                    <form onSubmit={handleSubmit(saveSignUp)} className="flex flex-column gap-2">

                        <Button label="הרשמה" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={changeVariableTrue} style={{ marginRight: "45px" }}></Button>
                        {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}> */}
                           <div style={{minHeight:"90px"}}>
                            <Controller
                                name="userName" control={control} rules={{ required: 'שדה חובה' }} 
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.userName} className={classNames({ 'p-error': errors.value })}>שם משתמש</label>
                                        <span className="p-float-label">
                                            <InputText id={field.userName} disabled={!variable} value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                onChange={(e) => field.onChange(e.target.value)} {...register("userName")} />
                                        </span>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )} 
                                />
                                </div>
                                
                                <div style={{minHeight:"90px"}}>
                            <Controller
                                name="email" control={control} rules={{ required: 'שדה חובה' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.email} className={classNames({ 'p-error': errors.value })}>מייל</label>
                                        <span className="p-float-label">
                                            <InputText id={field.email} disabled={!variable}
                                                value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                onChange={(e) => field.onChange(e.target.value)} {...register("email")} />
                                        </span>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )} />
                                </div>
                                <div style={{minHeight:"90px"}}>
                            <Controller
                                name="password" control={control} rules={{ required: 'שדה חובה' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.password} className={classNames({ 'p-error': errors.value })}>סיסמא</label>
                                        <span className="p-float-label">
                                            <InputText id={field.password} disabled={!variable} type="password"
                                                value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                                onChange={(e) => field.onChange(e.target.value)} {...register("password")} />
                                        </span>
                                        {getFormErrorMessage(field.name)}
                                    </>
                                )} />
                                </div>
                            {ifExist && <span style={{ color: "red" }}>המייל כבר רשום במערכת</span>}

                            <Button label="אישור" type="submit" icon="pi pi-check" disabled={!variable} style={{ fontSize: "18px" }} />
                        {/* </div> */}
                    </form>
                </div>



                <div className="w-full md:w-2 m-6">
                    <Divider layout="vertical" className="hidden md:flex">
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                    </Divider>
                </div>


                <div className="card flex justify-content-center">
                    <form onSubmit={handleSubmit(saveLogin)} className="flex flex-column gap-2">
                        <Button label="כניסה" icon="pi pi-user" severity="success" className="w-10rem mx-auto" onClick={changeVariableFalse}></Button>
                        <div style={{minHeight:"90px"}}>
                        <Controller
                            name="email2" control={control} rules={{ required: 'שדה חובה' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.email2} className={classNames({ 'p-error': errors.value })}>מייל</label>
                                    <span className="p-float-label">
                                        <InputText id={field.email2} disabled={variable}
                                            value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)} {...register("email2")} />
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )} />
</div>
<div style={{minHeight:"90px"}}>
                        <Controller
                            name="password2" control={control} rules={{ required: 'שדה חובה' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <label htmlFor={field.password2} className={classNames({ 'p-error': errors.value })}> סיסמא</label>
                                    <span className="p-float-label">
                                        <InputText id={field.password2} disabled={variable} type="password"

                                            value={field.value} className={classNames({ 'p-invalid': fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)} {...register("password2")} />
                                        {/* <label htmlFor={field.userName}>Name - Surname</label> */}

                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )} />
                            </div>

                        {notExist && <span style={{ color: "red" }}>חלק מהנתונים שגויים</span>}

                        {/* <Password disabled={variable} value={value2} onChange={(e) => setValue2(e.target.value)} toggleMask /> */}
                        <Button label="אישור" type="submit" icon="pi pi-check" disabled={variable} style={{ fontSize: "18px" }} />
                    </form>
                </div>
            </div >
        </div>
        <div style={{ textAlign: "right" }}>
            <Toast ref={toast} />
        </div>
    </>
    )
}