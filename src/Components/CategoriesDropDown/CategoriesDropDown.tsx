import "./CategoriesDropDown.scss";
import { FC, useState, useEffect } from "react";
import { Dropdown, FormCheck } from "react-bootstrap";
import useLocalData from "../../Tools/Hooks/useLocalData";
import CategoryModal from "../CategoryModal/CategoryModal";
import { PlusSmIcon, PencilIcon } from "@heroicons/react/solid";

const CategoriesDropDown: FC<CategoriesDropDownType> = ({ onCheck, defaultChecked }) => {
  const { categories } = useLocalData();
  const [open, setOpen] = useState(false);
  const [activeCatId, setActiveCatId] = useState<string>();
  const [checkedItems, setCheckedItems] = useState<string[]>([...(defaultChecked || [])]);

  useEffect(() => {
    onCheck?.(checkedItems);
  }, [checkedItems]);

  const addHandler = () => {
    setActiveCatId("new");
    setOpen(true);
  };

  const editHandler = (categoryId?: string) => {
    setActiveCatId(categoryId);
    setOpen(true);
  };

  const onCheckHandler = (categoryId?: string) =>
    setCheckedItems((prevState) => {
      let newState = [...prevState];
      const foundIndex = newState?.findIndex((c) => c === categoryId);
      if (foundIndex >= 0) newState = newState?.filter((s) => s !== categoryId);
      else newState?.push(categoryId || "");
      return newState;
    });

  return (
    <>
      <Dropdown align="end" className="categories-dropdown" autoClose="outside">
        <Dropdown.Toggle variant="outline-primary">Categories</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={addHandler} className="categories-dropdown-item-add">
            <PlusSmIcon /> Add Category
          </Dropdown.Item>
          {categories?.map((cat) => (
            <div
              onClick={() => onCheckHandler(cat?.categoryId)}
              key={cat?.categoryId}
              className="categories-dropdown-item"
            >
              <FormCheck
                onChange={() => {}}
                checked={checkedItems?.includes(cat?.categoryId || "")}
              />
              <span>{cat?.name || ""}</span>
              <PencilIcon
                onClick={(e) => {
                  e?.stopPropagation();
                  editHandler(cat?.categoryId);
                }}
                className="categories-dropdown-item-edit"
              />
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <CategoryModal categoryId={activeCatId} {...{ open, setOpen }} />
    </>
  );
};

type CategoriesDropDownType = {
  onCheck?: (categoryIDs?: string[]) => void;
  defaultChecked?: string[];
};

export default CategoriesDropDown;
