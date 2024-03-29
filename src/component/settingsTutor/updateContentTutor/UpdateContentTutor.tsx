import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentService from "../../../services/ContentService";
import Content from "../../../models/ContentModel";

const UpdateContentTutor = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null
  );
  const [content, setContent] = useState<Content>();
  const [titleError, setTitleError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ContentService.getContents().then((res) => {
      setContents(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedContentId !== null) {
      ContentService.getContentById(selectedContentId).then((res) => {
        setContent(res.data);
      });
    }
  }, [selectedContentId]);

  const updateContent = () => {
    if (titleError) {
      return;
    }

    ContentService.updateContent(selectedContentId!, content!);
    navigate("/settings_tutor");
  };

  const backToSettings = () => {
    navigate("/settings_tutor");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { title, value } = event.target;
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    if (title === "title" && (inputLength < 1 || inputLength > 255)) {
      setError(true);
      setErrorMessage("Title must be between 1 and 255 characters");
    } else {
      setError(false);
      setErrorMessage("");
    }

    setContent({
      ...content!,
      content: inputValue,
    });
  };

  return (
    <div>
      <h3 className="titleModal">Update Content</h3>
      <form>
        <div className="form-group">
          <label className="labelModal">Content</label>
          <select
            name="content"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setSelectedContentId(Number(e.target.value));
            }}
          >
            <option selected>Select the Content to update</option>
            {contents.map((content) => {
              return (
                <option key={content.id} value={content.id}>
                  {content.content}
                </option>
              );
            })}
          </select>
        </div>
        {content && (
          <>
            <div>
              <label className="labelModal">Update the Content</label>
              <input
                type="string"
                placeholder={content.content}
                name="content"
                className={`form-control ${titleError ? "border-red-500" : ""}`}
                value={content.content}
                onChange={(e) =>
                  handleInputChange(e, setTitleError, setTitleErrorMessage)
                }
              ></input>
              {titleErrorMessage && (
                <p className="text-muted">{titleErrorMessage}</p>
              )}
            </div>
            <div className="containerButtonModal">
              <button
                type="button"
                className="buttonCheck"
                onClick={updateContent}
                disabled={titleError}
              >
                <span className="frontCheck">
                  <i className="bi bi-check2"></i>
                </span>
              </button>
              <button className="buttonReturn" onClick={backToSettings}>
                <span className="frontReturn">
                  <i className="bi bi-arrow-left"></i>
                </span>
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
export default UpdateContentTutor;
