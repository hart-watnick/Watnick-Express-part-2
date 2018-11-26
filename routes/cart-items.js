"use strict";

const express = require("express");
const routes= express.Router();

const pool = require("../connection/pg-connection-pool.js");

routes.get("/cart-items", (req, res) => {
   pool.query("select * from ShoppingCart").then((result) => {
    res.json(result.rows);
   }); 
});

routes.put("/cart-items/:id", (req,res) => {
    pool.query("update ShoppingCart set product=$1::text, price=$2::int, quantity=$3::int where id=$4::int", [req.body.product, req.body.price, req.body.quantity, req.params.id]).then(() => {
        pool.query("select * from ShoppingCart order by id").then((result)=> {
            res.json(result.rows);
        });
    });
});

routes.delete("/cart-items/:id", (req,res) => {
    pool.query("delete from ShoppingCart where id=$1::int", [req.params.id]).then(() => {
        pool.query("select * from ShoppingCart").then((result)=> {
            res.json(result.rows);
        });
    });
});

routes.post("/cart-items", (req,res) => {
    pool.query("insert into ShoppingCart(product, price, quantity) values($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
        pool.query("select * from ShoppingCart").then((result)=> {
            res.json(result.rows);
        });
    });

});

module.exports = routes;