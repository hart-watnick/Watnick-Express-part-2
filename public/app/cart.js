"use strict";

const mainComp = {
    templateUrl: "app/cart.html",
    controller: ["CartService", function (CartService) {
        const vm = this;
        CartService.getAllItems().then((result) => {
            vm.listOfItems = result.data;
        });
        vm.addItem = (newItem) => {
            CartService.postItems(newItem).then((result) => {
                vm.listOfItems = result.data;
            });
        };
        vm.deleteItem = (id) => {
            CartService.deleteItems(id).then((result) => {
                vm.listOfItems = result.data;
            });
        };
        vm.updateItem = (editedItem) => {
            CartService.updateItems(editedItem).then((result) => {
                vm.listOfItems = result.data;
            });
        };
    }]

};

angular
    .module("App")
    .component("mainComp", mainComp);