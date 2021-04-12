import { Button, Input } from "@material-ui/core";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import "./App.css";
import logo from "./images/bridgitb-w.svg";
import { addItem, search, deleteItem } from "./redux/actions";

function App(props) {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [err, setErr] = useState("");

  const addNewItem = () => {
    if (!isNaN(price)) {
      if (!isEmpty(item) && !isEmpty(category)) {
        const newObj = {
          item,
          category,
          price,
          key: Math.floor(Math.random() * (9999 - 1 + 1)) + 1,
        };
        props.addItem({ allItems: props.allItems, newItem: newObj });
        setErr("");
      } else {
        setErr("Category and Item should not be empty");
      }
    } else {
      setErr("Price must be an number, ex. 1,2,4");
    }
  };

  const deleteAnItem = (row) => {
    props.deleteItem({ allItems: props.allItems, itemToDelete: row.key });
  };

  const columns = [
    {
      name: "item",
      cell: (row) => <div>{row.item}</div>,
    },
    {
      name: "category",
      cell: (row) => <div>{row.category}</div>,
    },

    {
      name: "price",
      cell: (row) => <div>{row.price}</div>,
    },

    {
      name: "options",
      cell: (row) => (
        <div>
          <Button children="delete" onClick={() => deleteAnItem(row)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <header className="app-header">
        <img src={logo} alt="logo" />
        <div className="app-header-title">
          Bridgit - Frontend code challenge
        </div>
      </header>
      <section className="app-content">
        {/* Add your implementation here */}

        <div className="inputsContainer">
          <div className="individualInput">
            Item
            <Input
              style={{ margin: 10 }}
              onChange={(item) => setItem(item.currentTarget.value)}
            />
          </div>

          <div className="individualInput">
            Category
            <Input
              style={{ margin: 10 }}
              onChange={(item) => setCategory(item.currentTarget.value)}
            />
          </div>

          <div className="individualInput">
            Price
            <Input
              style={{ margin: 10 }}
              onChange={(item) => setPrice(item.currentTarget.value)}
            />
          </div>

          <Button
            onClick={() => addNewItem()}
            children="+"
            style={{ backgroundColor: "dodgerblue" }}
          />
        </div>

        {err && <div style={{ color: "red" }}>{err}</div>}

        <DataTable columns={columns} data={props.currentItems} render />
      </section>
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (payload) => dispatch(addItem(payload)),
    deleteItem: (payload) => dispatch(deleteItem(payload)),
    search: (payload) => dispatch(search(payload)),
  };
}

function mapStateToProps(state) {
  return {
    allItems: state.allItems,
    currentItems: state.currentItems,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
