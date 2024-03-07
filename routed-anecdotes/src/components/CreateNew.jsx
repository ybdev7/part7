import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const contentField = useField("text", "content");
  const authorField = useField("text", "author");
  const urlField = useField("text", "info");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contentField.value);
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: urlField.value,
      votes: 0,
    });

    props.notify(`A new anecdote ${contentField.value} created`);
    navigate("/");
  };

  const reset = () => {
    contentField.reset();
    authorField.reset();
    urlField.reset();
  };

  const removeReset = (field) => {
    const { reset, ...others } = { ...field };
    return others;
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...removeReset(contentField)} />
        </div>
        <div>
          author
          <input {...removeReset(authorField)} />
        </div>
        <div>
          url for more info
          <input {...removeReset(urlField)} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
