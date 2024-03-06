import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';
import { useRef, useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import classes from "./style/details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { newBag } from "./bagApi";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from "react-router-dom";

////////////////////בעיה בinput סוג לא מוכר לשנות אותו    

export const AddBag = () => {

    let navigate = useNavigate();
    let options = ['S', 'M', 'L'];
    let [value, setValue] = useState(options[1]);

    let [valuePrice, setValuePrice] = useState();
    let [valueHeight, setValueHeight] = useState();
    let [valueWidth, setValueWidth] = useState();

    const toast = useRef(null);

    let token = useSelector(state => state.thisUser.currentUser)?.data.token;
    let addBagSchema = yup.object().shape({

        company: yup.string("חייב להיות מחרוזת").required("שדה חובה").min(2, "שם צריך להכיל מינימום שתי תווים").max(15, "שם יכול להכיל מקסימום 15 תווים"),
        description: yup.string("חייב להיות מחרוזת").default(" "),
        color: yup.string("חייב להיות מחרוזת").required("שדה חובה"),
        price: yup.string().required("שדה חובה"),
        size: yup.string().default("M"),
        width: yup.number(),
        height: yup.number(),
        imgUrl: yup.string().default("_1_8_18465_1.jpg")
    });


    let { control, register, handleSubmit, reset, formState: { dirtyFields, errors, isValid } } = useForm({
        mode: "all",
        resolver: yupResolver(addBagSchema),
        defaultValues: {
            size: "M",  // בררת מחדל עבור SelectButton
            width: 0,    // בררת מחדל עבור InputNumber
            height: 0,
            description: " ",
            // imgUrl:"_1_8_18465_1.jpg"
        }
    });

    const bagExist = () => {
        toast.current.show({ severity: 'error', detail: 'התיק כבר קיים', life: 2000 });
    }

    const accept = () => {
        navigate("/login");
    }

    const reject = () => {
    }
    const confirm = (position) => {
        confirmDialog({
            message: 'עליך להתחבר שוב על מנת לבצע פעולה זו',
            header: 'התחברות מחדש',
            icon: 'pi pi-info-circle',
            position,
            accept,
            reject,
            acceptLabel: "התחבר",
            rejectLabel: "לא עכשיו"
        });
    };


    const message = () => {
        toast.current.show({ severity: 'success', summary: 'הוספה', detail: 'המוצר התווסף בהצלחה', life: 3000 });
        setTimeout(() => {
            navigate("/");
        }, 2000);
    }

    const saveDetails = async (data) => {
        try {
            data = { ...data, size: value }
            let myBag = await newBag(data, token);
            message();
            reset();
        }
        catch (err) {
            if (err.response && err.response.status === 409)
                bagExist();
            else
                confirm('top-left');
        }

    }

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error"> </small>;
    };

    return (<>
        <div className={classes["dire"]} style={{ direction: "rtl", marginRight: "25%" }}>
            <form onSubmit={handleSubmit(saveDetails)} >
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ margin: "50px", marginBottom: "0px" }}>
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

                    <div style={{ margin: "50px", marginBottom: "0px" }}>
                        <div>
                            <label className={classNames({ 'p-error': errors.value })}>גודל</label>
                            <div className="card flex justify-content-center">
                                <>
                                    {/* <label className={classNames({ 'p-error': errors.value })}>גודל</label> */}
                                    <SelectButton value={value} style={{ marginTop: "7px", marginBottom: "30px", direction: "ltr" }} onChange={(e) => setValue(e.value)} options={options} />
                                </>
                            </div>
                        </div>
                        {/* <div className="flex-auto" style={{ marginBottom: "30px" }}>
                        <label htmlFor="minmax-buttons" className="block mb-2">מחיר</label>
                        <InputText inputId="minmax-buttons" style={{ direction: "ltr" }} value={valuePrice} onValueChange={(e) => setValuePrice(e.value)} mode="decimal" showButtons min={0}  />
                        <br />
                        {errors["price"] ?
                            <span className="p-error">שדה חובה</span>
                            : <span></span>} */}
                        {/* {getFormErrorMessage("price")} */}

                        {/* </div> */}





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
                <Button label="הוספה" type="Submit" style={{ marginRight: "30%", marginTop: "10px" }} />

            </form></div>
        <div style={{ textAlign: "right" }}>
            <Toast ref={toast} />
        </div>
        <div className="card">
            <ConfirmDialog />
        </div>
    </>

    );
}