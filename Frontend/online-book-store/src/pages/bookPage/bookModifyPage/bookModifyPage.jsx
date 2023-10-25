/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useBookHook from "../../../hooks/book/useBookHook";
import SideBar from "../../../components/sideBar/sideBar";
import Button from "../../../components/elements/button/button";
import Input from "../../../components/elements/input/input";
import "./bookModifyPage.style.scss";

const BookModifyPage = ({ isUpdate }) => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({});
  const { getBookById, addBook, updateBook } = useBookHook();
  const navigate = useNavigate();

  useEffect(() => {
    getBookData();
  }, [bookId]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      image: "",
      summary: "",
      author: "",
      price: null,
      stock: null,
      publishedDate: null,
      updateDate: null,
      totalSell: 0,
      edition: 1,
      ISBN: "",
      pageNumber: null,
      country: "",
      language: "",
      genre: [],
    },
  });

  const formatDate = (date) => {
    const dateObject = new Date(date);

    const year = dateObject.getUTCFullYear();
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getBookData = async () => {
    const result = await getBookById(bookId);
    if (result.success) {
      const currentPublishDate = formatDate(result.data.publishedDate);
      const currentUpdateDate = formatDate(result.data.updateDate);

      reset({
        title: result.data.title,
        image: result.data.image,
        summary: result.data.summary,
        author: result.data.author._id,
        price: result.data.price,
        stock: result.data.stock,
        publishedDate: currentPublishDate,
        updateDate: currentUpdateDate,
        totalSell: result.data.totalSell,
        edition: result.data.edition,
        ISBN: result.data.ISBN,
        pageNumber: result.data.pageNumber,
        country: result.data.country,
        language: result.data.language,
        genre: result.data.genre,
      });
      setBookData(result.data);
    }
  };

  const addBookData = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("summary", data.summary);
    formData.append("author", data.author);
    formData.append("price", parseFloat(data.price));
    formData.append("stock", parseInt(data.stock));
    formData.append("publishedDate", data.publishedDate);
    formData.append("updateDate", data.updateDate);
    // formData.append("totalSell", 100);
    formData.append("edition", data.edition);
    formData.append("ISBN", data.ISBN);
    formData.append("pageNumber", data.pageNumber);
    formData.append("country", data.country);
    formData.append("language", data.language);
    formData.append("genre",  ["Mystry", "Fantasy", "Adventure"],);

    const result = await addBook(formData);
    if (result.success) {
      navigate("/admin/books");
    }
  };

  const updateBookData = async (data) => {
    data = {
      ...data,
      bookId: bookId,
      price: parseFloat(data.price),
      totalSell: bookData.totalSell,
      pageNumber: parseInt(data.pageNumber),
      stock: bookData.stock,
      genre: bookData.genre,
    };
    const result = await updateBook(data);
    if (result.success) {
      navigate("/admin/books");
    }
  };

  const onSubmit = async (data) => {
    if (isUpdate) {
      updateBookData(data);
    } else {
      addBookData(data);
    }
  };

  return (
    <Fragment>
      <div className="sidebar-and-content-container">
        <SideBar></SideBar>
        <div className="book-modify-page-container">
          <h3 className="book-modify-page-title">
            {isUpdate ? "Update Book" : "Add Book"}
          </h3>
          <p className="book-modify-page-subtitle">
            Expand Your Literary Collection
          </p>
          <div className="book-modify-page-card">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="book-modify-page-input-field-row">
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Ttile</p>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter book's title"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Image</p>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <input
                        type="file"
                        placeholder="Enter book's image url"
                        className="auth-input-half"
                        // value={value.fileName}
                        onChange={(e) => onChange(e.target.files[0])}
                        // {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">Summary</p>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter book's summary"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field-row">
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Author</p>
                  <Controller
                    name="author"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter book's author"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Price</p>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="number"
                        placeholder="Enter book's price"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="book-modify-page-input-field-row">
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Publish Date</p>
                  <Controller
                    name="publishedDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="date"
                        placeholder="Enter book's publish date"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Update Date</p>
                  <Controller
                    name="updateDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="date"
                        placeholder="Enter book's update date"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="book-modify-page-input-field">
                <p className="book-modify-input-field-title">ISBN</p>
                <Controller
                  name="ISBN"
                  control={control}
                  render={({ field }) => (
                    <Input
                      field={field}
                      type="text"
                      placeholder="Enter book's ISBN"
                      className="auth-input"
                    />
                  )}
                />
              </div>
              <div className="book-modify-page-input-field-row">
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Edition</p>
                  <Controller
                    name="edition"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="number"
                        placeholder="Enter book's edition"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Page Number</p>
                  <Controller
                    name="pageNumber"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="number"
                        placeholder="Enter book's page number"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="book-modify-page-input-field-row">
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Country</p>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter book's country"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
                <div className="book-modify-page-input-field">
                  <p className="book-modify-input-field-title">Language</p>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <Input
                        field={field}
                        type="text"
                        placeholder="Enter book's language"
                        className="auth-input-half"
                      />
                    )}
                  />
                </div>
              </div>
              <Button
                title={isUpdate ? "Update Book" : "Add Book"}
                type="submit"
                className="auth-button"
                onClick={() => {}}
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookModifyPage;
