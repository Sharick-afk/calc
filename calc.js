    document.addEventListener("DOMContentLoaded", () => {
        var tabBtns = document.querySelectorAll("._customer-tab_btn");
        var tabBodies = document.querySelectorAll("._customer-tab_content");
        tabBtns.forEach(function (item) {
            item.addEventListener("click", function (e) {
                let _customerId = e.target.getAttribute("data-tab");
                tabBodies.forEach(function (item) {
                    item.classList.remove("_customer-active");
                });
                tabBtns.forEach(function (item) {
                    item.classList.remove("_customer-active");
                });
                item.classList.add("_customer-active");
                document
                    .getElementById(_customerId)
                    .classList.add("_customer-active");
            });
        });
        var priseContainer = document.querySelector("._customer-total_prise");
        let productsList = document.querySelectorAll(
            "._customer-products_list input"
        );
        var customerQuantityInput = document.querySelector("#customerQuantity");
        var orderVolumeInput = document.querySelector("#customerVolume");
        var orderAreaInput = document.querySelector("#customerArea");

        productsList.forEach(function (item) {
            item.addEventListener("click", function () {
                orderArea();
                orderVolume();
                orderPrise();
            });
        });

        let customerQuantity = document.querySelector("#customerQuantity");
        customerQuantity.closest("span").addEventListener("click", function () {
            customerQuantity.click();
        });
        customerQuantity.addEventListener("click", function () {
            orderArea();
            orderVolume();
            orderPrise();
        });
        customerQuantity.addEventListener("change", function () {
            orderArea();
            orderVolume();
            orderPrise();
        });
        let customerAreaInput = document.querySelector("#customerArea");
        customerAreaInput
            .closest("span")
            .addEventListener("click", function () {
                customerAreaInput.click();
            });
        customerAreaInput.addEventListener("click", function () {
            orderQuantityForArea();
            orderPriseForArea();
            orderVolume();
            orderPrise();
        });
        customerAreaInput.addEventListener("change", function () {
            orderQuantityForArea();
            orderPriseForArea();
            orderVolume();
            orderPrise();
        });
        let customerVolumeInput = document.querySelector("#customerVolume");
        customerVolumeInput
            .closest("span")
            .addEventListener("click", function () {
                customerVolumeInput.click();
            });
        customerVolumeInput.addEventListener("click", function () {
            orderQuantityForVolume();
            orderAreaForVolume();
            orderPriseForVolume();
            orderPrise();
        });
        customerVolumeInput.addEventListener("change", function () {
            orderQuantityForVolume();
            orderAreaForVolume();
            orderPriseForVolume();
            orderPrise();
        });
        function orderPrise() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );
            priseContainer.innerHTML = `${Math.ceil(
                selectedProduct.getAttribute("data-prise-per-one") *
                    customerQuantityInput.value
            )} `;
        }

        function orderArea() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );

            orderAreaInput.value = `${(
                (selectedProduct.getAttribute("data-length") *
                    selectedProduct.getAttribute("data-width") *
                    customerQuantityInput.value) /
                1000000
            ).toFixed(3)}`;
        }

        function orderVolume() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );

            orderVolumeInput.value = `${(
                (selectedProduct.getAttribute("data-length") *
                    selectedProduct.getAttribute("data-width") *
                    selectedProduct.getAttribute("data-height") *
                    customerQuantityInput.value) /
                1000000000
            ).toFixed(3)}`;
        }

        function orderQuantityForArea() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );

            customerQuantityInput.value = `${Math.ceil(
                orderAreaInput.value /
                    ((selectedProduct.getAttribute("data-length") *
                        selectedProduct.getAttribute("data-width")) /
                        1000000)
            )}`;
        }

        function orderPriseForArea() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );
            priseContainer.innerHTML = `${Math.ceil(
                (orderAreaInput.value /
                    ((selectedProduct.getAttribute("data-length") *
                        selectedProduct.getAttribute("data-width")) /
                        1000000)) *
                    selectedProduct.getAttribute(" data-prise-per-one")
            )}`;
        }

        function orderPriseForVolume() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );
            priseContainer.innerHTML = `${Math.ceil(
                (orderVolumeInput.value /
                    ((selectedProduct.getAttribute("data-length") *
                        selectedProduct.getAttribute("data-width") *
                        selectedProduct.getAttribute("data-height")) /
                        1000000000)) *
                    selectedProduct.getAttribute(" data-prise-per-one")
            )}`;
        }

        function orderAreaForVolume() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );
            orderAreaInput.value = `${Math.ceil(
                (customerQuantityInput.value *
                    (selectedProduct.getAttribute("data-length") *
                        selectedProduct.getAttribute("data-width"))) /
                    1000000
            )}`;
        }

        function orderQuantityForVolume() {
            let selectedProduct = document.querySelector(
                "._customer-products_list input:checked"
            );

            customerQuantityInput.value = `${Math.ceil(
                (orderVolumeInput.value * 1000000000) /
                    (selectedProduct.getAttribute("data-width") *
                        selectedProduct.getAttribute("data-height") *
                        selectedProduct.getAttribute("data-length"))
            )}`;
        }
        const _customerSubmitButton =
            document.querySelector("#_customerSubmit");
        _customerSubmitButton.disabled = true;
        let _customerFinalMessage = "";

        function _customerSendForm() {
            if (_customerSubmitButton.disabled !== true) {
                _customerFinalMessage = `Добрый день!\nМеня интересует:${
                    document
                        .querySelector("._customer-products_list input:checked")
                        .closest("._customer-order_wrapper")
                        .querySelector("._customer-products_type_title")
                        .innerHTML
                }\nСледующих размеров: ${
                    document.querySelector(
                        "._customer-products_list input:checked ~ label"
                    ).innerHTML
                }, в колличестве ${customerQuantityInput.value} шт`;
            }
        }

        function openWidget() {
            _customerSendForm();
            setTimeout(() => {
                document.querySelector(
                    "#order_messages_attributes_0_text"wwwww
                ).value = _customerFinalMessage;
            }, 1000);
        }
        _customerSubmitButton.addEventListener("click", function (event) {
            openWidget();
        });
        let calcBody = document.querySelector("._customer-calc");
        calcBody.addEventListener("click", () => {
            formValidate();
        });

        function formValidate() {
            if (customerQuantityInput.value != 0) {
                _customerSubmitButton.disabled = false;
            }
        }

        _customerSubmitButton.addEventListener("click", function (event) {
            openWidget();
        });
    });
