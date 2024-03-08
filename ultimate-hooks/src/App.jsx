import { useState, useEffect } from "react";
import { createNew, getAll } from "./services/service";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const removeReset = (field) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...others } = { ...field };
  return others;
};
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const [service, setService] = useState({});

  useEffect(() => {
    (async (baseUrl) => {
      const allResources = await getAll(baseUrl);
      console.log("here1");
      setResources(allResources);

      const create = async (resource) => {
        console.log("in create");
        const result = await createNew(baseUrl, resource);
        console.log("created");
        setResources(await getAll(baseUrl));
        console.log("updated all");
        return result;
      };

      const service = {
        create,
      };

      setService(service);
    })(baseUrl);
  }, []);

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    console.log("here2");
    noteService.create({ content: content.value });
    console.log("here3");
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...removeReset(content)} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...removeReset(name)} /> <br />
        number <input {...removeReset(number)} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
