import "./App.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import syntax from "./basic-syntax.json";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const App = () => {
  const [code, setCode] = useLocalStorage("init", "## Hello");
  const [compiled, setCompiled] = useState(marked.parse(code));
  const [activeTab, setActiveTab] = useState("Editor");

  const openMD = () => {
    console.log(0);
    setActiveTab("Editor");
  };

  const openPreview = () => {
    console.log(0);
    setActiveTab("Preview");
  };
  const openDocs = () => {
    console.log(0);
    setActiveTab("Docs");
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  const jsonSyntax = syntax.basic_syntax;

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">
            MarkDown
          </button>
          <button onClick={openPreview}>Preview</button>
          <button onClick={openDocs}>DOCS</button>
        </div>
        {activeTab === "Editor" && (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        )}
        {activeTab === "Preview" && (
          <div>
            <textarea value={compiled} readOnly />
          </div>
        )}

        {activeTab === "Docs" && (
          <div>
            {jsonSyntax.map((obj, index) => {
              return (
                <div className="examples" key={index}>
                  <h2>{obj.name}</h2>
                  <p>{obj.description}</p>
                  <h3>Examples:</h3>
                  {obj.examples.map((ex, exIndex) => {
                    return (
                      <div key={exIndex}>
                        <code>{ex.markdown}</code>

                        <div>
                          <code>{ex.html}</code>
                        </div>
                        {obj.additional_examples.value && (
                          <div>
                            <code>{obj.additional_examples}</code>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
