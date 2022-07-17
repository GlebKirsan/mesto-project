(()=>{"use strict";var e=function(e,t){e.classList.add(t),e.disabled=!0},t=function(t,n,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?function(e,t){e.classList.remove(t),e.disabled=!1}(n,r):e(n,r)},n={authorization:"5374e37d-a100-45c2-9054-8042aa4bada1","Content-Type":"application/json"},r="https://mesto.nomoreparties.co/v1/".concat("plus-cohort-12"),o="".concat(r,"/users/me"),u="".concat(o,"/avatar"),c="".concat(r,"/cards"),i="".concat(c,"/likes");function a(e,t){return 200<=e.status&&e.status<300?e.json():Promise.reject(t+"".concat(e.status,"."))}function l(e){return fetch(i+"/".concat(e),{method:"PUT",headers:n}).then((function(e){return a(e,"Ошибка лайка карточки")})).then((function(e){return e.likes.length}))}function s(e){return fetch(i+"/".concat(e),{method:"DELETE",headers:n}).then((function(e){return a(e,"Ошибка удаления лайка карточки")})).then((function(e){return e.likes.length}))}function p(e){return e.createdAt=new Date(e.createdAt),e}function d(e,t){return t.createdAt-e.createdAt}function _(e,t){t.textContent=e?"Сохранение...":"Сохранить"}var f=document.querySelector(".cards"),v=document.querySelector(".popup_image-view"),m=v.querySelector(".popup__image"),h=v.querySelector(".popup__image-caption"),y=document.querySelector("#card-template").content.querySelector(".card"),S="card__like_active";function q(e,t){var n;return e.querySelector(".card__likes-counter").textContent=(n=t)>1e3?Math.round(n/1e3*10)/10+"k":n>1e6?Math.round(n/1e6*10)/10+"m":n>1e9?Math.round(n/1e9*10)/10+"m":n,e}function b(e,t){return e.querySelector(".card__id").textContent=t,e}var L=function(e,t){var r=y.cloneNode(!0),o=r.querySelector(".card__image");return r.querySelector(".card__name").textContent=e,o.src=t,o.alt=e,r.querySelector(".card__like").addEventListener("click",(function(e){var t=r.querySelector(".card__id").textContent;(e.target.classList.contains(S)?s:l)(t).then((function(t){return function(e,t,n){e.target.classList.toggle(S),q(n,t)}(e,t,r)}))})),r.querySelector(".card__delete").addEventListener("click",(function(e){var t=r.querySelector(".card__id").textContent;(function(e){return fetch(c+"/".concat(e),{method:"DELETE",headers:n}).then((function(e){return a(e,"Ошибка удаления карточки")}))})(t).then((function(){return e.target.closest(".card").remove()})).catch((function(){return console.error("Ошибка удаления карточки ".concat(t))}))})),o.addEventListener("click",(function(){m.src=t,m.alt=e,h.textContent=e,U(v)})),r},E=function(e){f.append(e)},k=function(e){f.prepend(e)},g=document.querySelector(".popup_edit-profile"),C=g.querySelector(".popup__input_data_name"),x=g.querySelector(".popup__input_data_description"),A=g.querySelector(".popup__submit-button"),w=document.querySelector(".profile__info"),D=w.querySelector(".profile__name"),T=document.querySelector(".profile__avatar-image"),P=w.querySelector(".profile__description"),B=document.querySelector(".popup_add-card"),M=B.querySelector(".popup__input_data_name"),N=B.querySelector(".popup__input_data_link"),O=B.querySelector(".popup__submit-button"),j=document.querySelector(".popup_edit-avatar"),J=j.querySelector(".popup__input"),H=j.querySelector(".popup__submit-button"),z=function(e){var t=e.target.classList.contains("popup__figure-container");e.target.classList.contains("popup__container")||t||F(e.target)},I=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");F(t)}},U=function(e){e.classList.add("popup_opened"),e.addEventListener("click",z),document.addEventListener("keydown",I)},F=function(e){e.classList.remove("popup_opened"),e.removeEventListener("click",z),document.removeEventListener("keydown",I)};document.querySelector(".profile__edit-button").addEventListener("click",(function(){C.value=D.textContent,x.value=P.textContent,U(g)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return U(B)})),document.querySelectorAll(".popup__close-button").forEach((function(e){return e.addEventListener("click",(function(e){F(e.target.closest(".popup"))}))})),g.querySelector(".popup__edit-area").addEventListener("submit",(function(e){var t,r;e.preventDefault(),_(!0,A),(t=C.value,r=x.value,fetch(o,{method:"PATCH",headers:n,body:JSON.stringify({name:t,about:r})}).then((function(e){return a(e,"Ошибка обновлении информации о пользователе")}))).then((function(){D.textContent=C.value,P.textContent=x.value,F(e.target.closest(".popup"))})).finally((function(){return _(!1,A)}))})),B.querySelector(".popup__edit-area").addEventListener("submit",(function(t){var r,o,u;t.preventDefault(),_(!0,O),(o=M.value,u=N.value,fetch(c,{method:"POST",headers:n,body:JSON.stringify({name:o,link:u})}).then((function(e){return a(e,"Ошибка создания новой карточки")}))).then((function(e){return r=e._id,L(e.name,e.link)})).then((function(e){return b(e,r)})).then(k).then((function(){F(t.target.closest(".popup")),t.target.reset(),e(O,"popup__submit-button_inactive")})).finally((function(){return _(!1,O)}))}));var G,K,Q=document.querySelector(".profile__avatar-edit-button");Q.addEventListener("click",(function(){return U(j)})),j.querySelector(".popup__edit-area").addEventListener("submit",(function(t){var r;t.preventDefault(),_(!0,H),(r=J.value,fetch(u,{method:"PATCH",headers:n,body:JSON.stringify({avatar:r})})).then((function(){T.src=J.value,F(t.target.closest(".popup")),t.target.reset(),e(Q,"popup__submit-button_inactive")})).finally((function(){return _(!1,H)}))})),fetch(o,{headers:n}).then((function(e){return a(e,"Ошибка получения информации о пользователе")})).then((function(e){var t,n,r;G=e._id,t=e.avatar,n=e.name,r=e.about,D.textContent=n,P.textContent=r,T.src=t})).then((function(){return fetch(c,{headers:n}).then((function(e){return a(e,"Ошибка получения карточек")}))})).then((function(e){(e=e.map(p).sort(d)).forEach((function(e){var t;(t=e.link,new Promise((function(e,n){var r=new Image;r.src=t,r.onload=e,r.onerror=n}))).then((function(){return L(e.name,e.link)})).then((function(t){return b(t,e._id)})).then((function(t){return q(t,e.likes.length)})).then((function(t){return function(e,t){return t&&e.querySelector(".card__like").classList.add("card__like_active"),e}(t,e.likes.map((function(e){return e._id})).includes(G))})).then((function(t){return function(e,t){return t||e.querySelector(".card__delete").remove(),e}(t,e.owner._id===G)})).then(E).catch((function(){return console.error("Изображение ".concat(e.name," по ссылке ").concat(e.link," не доступно."))}))}))})),K={formSelector:".popup__edit-area",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"},Array.from(document.querySelectorAll(K.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,n){var r=Array.from(e.querySelectorAll(n.inputSelector)),o=e.querySelector(n.submitButtonSelector);t(r,o,n.inactiveButtonClass),r.forEach((function(u){return u.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,u,n),t(r,o,n.inactiveButtonClass)}))}))}(e,K)}))})();