import  { FC } from "react";
import styles from "./FormField.module.scss";
import { ErrorMessage, Field } from "formik";

interface FormProps {
    name: string,
    text:string,
    title: string, 
    msgName: string,  
    as?:string,
    type?: string,
}
const FormField:FC<FormProps> = ({name, text,title, msgName, as, type}) => {
	return (
		<div className={styles.wrapper}>
			<label htmlFor={name} className="filter-title">
				{title}
			</label>
			<Field
				id={name}
				name={name}
                as={as}
                type={type}
				placeholder={text}
				className={styles.field}
			/>
			<ErrorMessage name={msgName}>
				{(msg) => <div className={styles.msg}>{msg}</div>}
			</ErrorMessage>
		</div>
	);
};

export default FormField;
