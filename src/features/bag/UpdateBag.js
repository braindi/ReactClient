
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { classNames } from 'primereact/utils';
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { editBag, newBag } from "./bagApi";
import classes from "./style/details.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

////////////////////בעיה בinput סוג לא מוכר לשנות אותו    

export const UpdateBag = (props) => {
    let location = useLocation();
    let navigate = useNavigate();

    let options = ['S', 'M', 'L'];

    let defaultSize = options.includes(location.state.size) ? location.state.size : options[1];
    const toast = useRef(null);


    let [value, setValue] = useState(defaultSize);
    // let [valuePrice, setValuePrice] = useState();
    let [valueHeight, setValueHeight] = useState(location.state.height);
    let [valueWidth, setValueWidth] = useState(location.state.width);
    let token = useSelector(state => state.thisUser.currentUser)?.data.token;
    let addBagSchema = yup.object().shape({

        company: yup.string("חייב להיות מחרוזת").required("שדה חובה").min(2, "שם צריך להכיל מינימום שתי תווים").max(15, "שם יכול להכיל מקסימום 15 תווים"),
        description: yup.string("חייב להיות מחרוזת"),
        color: yup.string("חייב להיות מחרוזת").required("שדה חובה"),
        price: yup.string().required("שדה חובה"),
        size: yup.string(),
        width: yup.number(),
        height: yup.number(),
        imgUrl: yup.string()
    });


    let { control, register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
        mode: "all",
        resolver: yupResolver(addBagSchema),
        defaultValues: {
            company: location.state.company,
            description: location.state.description,
            color: location.state.color,
            price: location.state.price,
            size: defaultSize,
            width: location.state.width,
            height: location.state.height,
            imgUrl: location.state.imgUrl
        },
    });

    const message = () => {
        toast.current.show({ severity: 'success', summary: 'עריכה', detail: 'המוצר יתעדכן בהצלחה', life: 3000 });
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }
    const goBack = () => {
        navigate('/');
    }
    const saveDetails = async (data) => {

        try {
            let dd = { ...data, size: value };
            let myBag = await editBag(location.state._id, dd, token);
            message();
            reset();
        }
        catch (err) {
            confirm('top-left');
        }

    }

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error"> </small>;
    };
    const accept = () => {
        navigate("/login");
    }

    const confirm = (position) => {
        confirmDialog({
            message: 'עליך להתחבר שוב על מנת לבצע פעולה זו',
            header: 'התחברות מחדש',
            icon: 'pi pi-info-circle',
            position,
            accept,
            acceptLabel: "התחבר",
            rejectLabel: "לא עכשיו"
        });
    };


    return (<>
        <div style={{ textAlign: "right" }}>
            <Toast ref={toast} />
        </div>
        <div className={classes["dire"]} style={{ direction: "rtl", marginRight: "25%" }}>
            <form onSubmit={handleSubmit(saveDetails)} >
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ margin: "50px" }}>
                        <div style={{ marginBottom: "30px" }}>
                            <Controller name="company" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                <><label htmlFor={field.company} className={errors[field.name] ? "p-error" : ""}>שם התיק</label>
                                    <span className="p-float-label">
                                        <InputText id={field.company}
                                            value={field.value} style={{ marginTop: "7px" }} className={classNames({ 'p-invalid': fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)} {...register("company")} />
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>)} />
                        </div>
                        <Controller name="description" control={control} render={({ field, fieldState }) => (
                            <><label htmlFor={field.description} className={classNames({ 'p-error': errors.value })}>סוג התיק</label>
                                <span className="p-float-label">
                                    <InputText id={field.description}
                                        value={field.value} style={{ marginTop: "7px", marginBottom: "30px" }} className={classNames({ 'p-invalid': fieldState.error })}
                                        onChange={(e) => field.onChange(e.target.value)} {...register("description")} />
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>)} />
                        <div style={{ marginBottom: "30px" }}>
                            <Controller name="color" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                <><label htmlFor={field.color} className={errors[field.name] ? "p-error" : ""}>צבע</label>
                                    <span className="p-float-label">
                                        <InputText id={field.color}
                                            value={field.value} style={{ marginTop: "7px" }} className={classNames({ 'p-invalid': fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)} {...register("color")} />
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>)} />
                        </div>

                        <Controller name="imgUrl" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                            <><label htmlFor={field.imgUrl} className={classNames({ 'p-error': errors.value })}>ניתוב לתמונה</label>
                                <span className="p-float-label">
                                    <InputText id={field.imgUrl} defaultValue={"_1_8_18465_1.jpg"}
                                        value={field.value} style={{ marginTop: "7px", marginBottom: "30px" }} className={classNames({ 'p-invalid': fieldState.error })}
                                        onChange={(e) => field.onChange(e.target.value)} {...register("imgUrl")} />


                                </span>
                                {getFormErrorMessage(field.name)}
                            </>)} />
                    </div>

                    <div style={{ margin: "50px" }}>
                        <div>
                            <label className={classNames({ 'p-error': errors.value })}>גודל</label>
                            <div className="card flex justify-content-center">
                                <>
                                    <SelectButton value={value} style={{ marginTop: "7px", marginBottom: "30px", direction: "ltr" }} onChange={(e) => setValue(e.value)} options={options} />
                                </>
                            </div>
                        </div>
                        <div style={{ marginBottom: "30px" }}>
                            <Controller name="price" control={control} rules={{ required: 'שדה חובה' }} render={({ field, fieldState }) => (
                                <><label htmlFor={field.price} className={errors[field.name] ? "p-error" : ""}>מחיר</label>
                                    <span className="p-float-label">
                                        <InputText id={field.price}
                                            value={field.value} style={{ marginTop: "7px" }} type="number" className={classNames({ 'p-invalid': fieldState.error })}
                                            onChange={(e) => field.onChange(e.target.value)} {...register("price")} />
                                    </span>
                                    {getFormErrorMessage(field.name)}
                                </>)} />
                        </div>
                        <div className="flex-auto">
                            <label htmlFor="minmax-buttons" className="block mb-2">גובה</label>
                            <InputNumber inputId="minmax-buttons" value={valueHeight} style={{ marginBottom: "30px", direction: "ltr" }} onValueChange={(e) => setValueHeight(e.value)} mode="decimal" showButtons min={0} />
                        </div>
                        <div className="flex-auto" >
                            <label htmlFor="minmax-buttons" className="block mb-2">רוחב</label>
                            <InputNumber inputId="minmax-buttons" value={valueWidth} style={{ marginBottom: "30px", direction: "ltr" }} onValueChange={(e) => setValueWidth(e.value)} mode="decimal" showButtons min={0} />
                        </div>

                    </div>
                </div>
                <Button label="אישור" type="Submit" style={{ marginRight: "30%" }} />
                <Button label="חזרה למוצרים" onClick={goBack} style={{ marginRight: "30%" }} />
                <div className="card" style={{alignItems: "center",justifyItems:"center"}}>
                    <ConfirmDialog />
                </div>
            </form></div></>);
}
