import { memo, useEffect, useRef, useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { Sort, SortPropertyEnum } from "../redux/filter/types";
import { setSort } from "../redux/filter/slice";
// import { useWhyDidYouUpdate } from "ahooks";

type SortItem = {
    name: string;
    sortProperty: SortPropertyEnum;
};
type SortPopupProps = {
    value: Sort;
};

export const list: SortItem[] = [
    { name: "популярности (DESK)", sortProperty: SortPropertyEnum.PRICE_DESK },
    { name: "популярности (ASK)", sortProperty: SortPropertyEnum.PRICE_ASK },
    { name: "цене (DESK)", sortProperty: SortPropertyEnum.PRICE_DESK },
    { name: "цене (ASK)", sortProperty: SortPropertyEnum.PRICE_ASK },
    { name: "алфавиту (DESK)", sortProperty: SortPropertyEnum.TITLE_DESK },
    { name: "алфавиту (ASK)", sortProperty: SortPropertyEnum.TITLE_ASK },
];

const SortPopup: React.FC<SortPopupProps> = memo(({ value }) => {
    const [open, setOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    // useWhyDidYouUpdate("SortPopup", { value });
    const onClickListItem = (obj: SortItem) => {
        dispatch(setSort(obj));
        setOpen(false);
    };
    // ====================================================================
    useEffect(() => {
        const handleClickOut = (event: MouseEvent) => {
            const composed = event.composedPath();
            if (sortRef.current && !composed.includes(sortRef.current))
                setOpen(false);
        };

        document.body.addEventListener("click", handleClickOut);

        return () => {
            document.body.removeEventListener("click", handleClickOut);
        };
    }, []);

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{value.name}</span>
            </div>
            {open && (
                <div className="sort__popup">
                    <ul>
                        {list.map((obj, i) => (
                            <li
                                key={i}
                                onClick={() => onClickListItem(obj)}
                                className={
                                    value.sortProperty === obj.sortProperty
                                        ? "active"
                                        : ""
                                }
                            >
                                {obj.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});
export default SortPopup;
