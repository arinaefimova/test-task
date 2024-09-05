import React, { useState, useCallback, useMemo } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { productFormValidation } from "../../lib/validation";
import styles from "./CreateProduct.module.scss";
import FormField from "../../components/ui/FormField/FormField";
import MyDropzone from "../../components/ui/DropZone/DropZone";
import { useAppDispatch } from "../../redux/hooks";
import { addProduct, deleteProduct, editProduct } from "../../redux/slices/productSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CiCircleRemove } from "react-icons/ci";
import { Product } from "../../types";

const initialValues = {
  name: "",
  type: "",
  calories: 0,
  description: "",
  meal: "",
  image: null as File | null,
};

const CreateProduct: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imgErr, setImgErr] = useState(false);
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  const validate = useCallback((values: typeof initialValues) => {
    const result = productFormValidation.safeParse(values);
    if (!result.success) {
      return result.error.errors.reduce((acc, error) => {
        if (error.path.length > 0) {
          acc[error.path[0]] = error.message;
        }
        return acc;
      }, {} as { [key: string]: string });
    }
    return {};
  }, []);

  const handleSubmit = useCallback(
    (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
      if (!image) {
        setImgErr(true);
        return;
      }
      setImgErr(false);
      dispatch(addProduct({ ...values, image }));
      resetForm();
      setImage(null);
      window.scrollTo(0, 0);
    },
    [dispatch, image]
  );

  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [editValues, setEditValues] = useState(initialValues);

  const handleEditClick = useCallback((product: Product) => {
    if (product.id === undefined) {
      console.error("Product ID is undefined");
      return;
    }
    setEditingProduct(product.id); 
    setEditValues(product);
  }, []);
  

  const handleImageChange = useCallback((file: File | null) => {
    setEditValues((prev) => ({
      ...prev,
      image: file,
    }));
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSave = useCallback(() => {
    dispatch(editProduct(editValues));
    setEditingProduct(null);
  }, [dispatch, editValues]);

  const handleDelete = useCallback((id: number) => {
    dispatch(deleteProduct(id));
  }, [dispatch]);

  const productItems = useMemo(() => products.map((product) => (
    <div key={product.id} className={styles.inner}>
      {editingProduct === product.id ? (
        <>
          <div className={styles.box}>
            <h3 className="details-title details-title_nm">Title:</h3>
            <input type="text" name="name" value={editValues.name} onChange={handleChange} />
          </div>
          <MyDropzone setImage={handleImageChange} image={editValues.image} title="" />
          <div className={styles.boxDescr}>
            <h3 className="details-title details-title_nm">Description:</h3>
            <textarea name="description" value={editValues.description} onChange={handleChange} />
          </div>
          <div className={styles.box}>
            <h3 className="details-title details-title_nm">Type of meal:</h3>
            <input type="text" name="meal" value={editValues.meal} onChange={handleChange} />
          </div>
          <div className={styles.box}>
            <h3 className="details-title details-title_nm">Calories:</h3>
            <input type="number" name="calories" value={editValues.calories} onChange={handleChange} />
          </div>
          <div className={styles.box}>
            <h3 className="details-title details-title_nm">Cuisine:</h3>
            <input type="text" name="type" value={editValues.type} onChange={handleChange} />
          </div>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={handleSave}>Save</button>
            <button className={styles.button} onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <div className={styles.item}>
          <div className={styles.remove} onClick={() => handleDelete(product?.id!)}><CiCircleRemove size={30} /></div>
          <p className={styles.label}>{product.name}</p>
          {product.image && product.image instanceof File && (
            <img className={styles.img} src={URL.createObjectURL(product.image)} alt={product.name} />
          )}
          <p className={styles.descr}>Info:<span>{product.description}</span></p>
          <p className="details-title details-title_sm">Type of meal: <span>{product.meal}</span></p>
          <p className="details-title details-title_sm">Calories:<span> {product.calories} </span></p>
          <p className="details-title details-title_sm">Cuisine: <span>{product.type}</span></p>
          <button className={styles.button} onClick={() => handleEditClick(product)}>Edit</button>
          <hr />
        </div>
      )}
    </div>
  )), [editingProduct, editValues, handleChange, handleEditClick, handleImageChange, handleSave, handleDelete, products]);

  return (
    <div className={styles.createProduct}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.f}>
            <h1 className="title">Create your product</h1>
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className={styles.form}>
                  <FormField name="name" text="Product name..." title="Product name" msgName="name" />
                  <FormField name="type" text="Cuisine type..." title="Cuisine type" msgName="type" />
                  <FormField type="number" name="calories" text="Calories..." title="Calories" msgName="calories" />
                  <FormField as="textarea" name="description" text="Type anything here..." title="Description" msgName="description" />
                  <FormField name="meal" text="Meal..." title="Type of meal" msgName="type" />
                  <MyDropzone title="Choose image" setImage={setImage} image={image} />
                  {imgErr && <div className={styles.msg}>You should add an image</div>}
                  <button type="submit" className={styles.button}>Create product</button>
                </Form>
              )}
            </Formik>
          </div>
          <div className={styles.c}>
            {products.length > 0 && (
              <div>
                <h2 className="title">Created products:</h2>
                <div className={styles.wrapper}>{productItems}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
