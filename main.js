(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{Z0:()=>te,ip:()=>ee,u3:()=>$});var t=function(e,t){e.classList.add(t),e.disabled=!0},n=function(e,n,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.classList.remove(t),e.disabled=!1}(n,r):t(n,r)},r=document.querySelector(".popup_edit-profile"),o=r.querySelector(".popup__input_data_name"),u=r.querySelector(".popup__input_data_description"),c=r.querySelector(".popup__submit-button"),i=document.querySelector(".profile__info"),a=i.querySelector(".profile__name"),l=document.querySelector(".profile__avatar-image"),s=i.querySelector(".profile__description"),p=document.querySelector(".popup_add-card"),d=p.querySelector(".popup__input_data_name"),f=p.querySelector(".popup__input_data_link"),_=p.querySelector(".popup__submit-button"),v=document.querySelector(".popup_edit-avatar"),m=v.querySelector(".popup__input"),h=v.querySelector(".popup__submit-button"),y=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__avatar-edit-button"),q=document.querySelector(".profile__add-button"),b=document.querySelectorAll(".popup__close-button"),L=document.querySelector(".cards"),k=document.querySelector(".popup_image-view"),E=k.querySelector(".popup__image"),g=k.querySelector(".popup__image-caption"),C=document.querySelector("#card-template").content.querySelector(".card"),x="card__like_active",A={authorization:"5374e37d-a100-45c2-9054-8042aa4bada1","Content-Type":"application/json"},P="https://mesto.nomoreparties.co/v1/".concat("plus-cohort-12"),w="".concat(P,"/users/me"),D="".concat(w,"/avatar"),O="".concat(P,"/cards"),T="".concat(O,"/likes");function j(e,t){return 200<=e.status&&e.status<300?e.json():Promise.reject(t+"".concat(e.status,"."))}function B(e){return fetch(T+"/".concat(e),{method:"PUT",headers:A}).then((function(e){return j(e,"Ошибка лайка карточки")})).then((function(e){return e.likes.length}))}function M(e){return fetch(T+"/".concat(e),{method:"DELETE",headers:A}).then((function(e){return j(e,"Ошибка удаления лайка карточки")})).then((function(e){return e.likes.length}))}function N(e){return e.createdAt=new Date(e.createdAt),e}function J(e,t){return t.createdAt-e.createdAt}function H(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function z(e,t){var n;return e.querySelector(".card__likes-counter").textContent=(n=t)>1e3?Math.round(n/1e3*10)/10+"k":n>1e6?Math.round(n/1e6*10)/10+"m":n>1e9?Math.round(n/1e9*10)/10+"m":n,e}function I(e,t){return e.querySelector(".card__id").textContent=t,e}var U,Z=function(e,t,n,r,o){var u=C.cloneNode(!0),c=u.querySelector(".card__image");return u.querySelector(".card__name").textContent=e,c.src=t,c.alt=e,u.querySelector(".card__like").addEventListener("click",(function(e){return n(e,u)})),u.querySelector(".card__delete").addEventListener("click",(function(e){return r(e,u)})),c.addEventListener("click",o),u},F=function(e){L.append(e)},G=function(e){L.prepend(e)},K=function(e){var t=e.target.classList.contains("popup__figure-container");e.target.classList.contains("popup__container")||t||V(e.target)},Q=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");V(t)}},R=function(e){e.classList.add("popup_opened"),e.addEventListener("click",K),document.addEventListener("keydown",Q)},V=function(e){e.classList.remove("popup_opened"),e.removeEventListener("click",K),document.removeEventListener("keydown",Q)};y.addEventListener("click",(function(){o.value=a.textContent,u.value=s.textContent,R(r)})),q.addEventListener("click",(function(){return R(p)})),b.forEach((function(e){return e.addEventListener("click",(function(e){V(e.target.closest(".popup"))}))})),r.querySelector(".popup__edit-area").addEventListener("submit",(function(e){return $(e)})),p.querySelector(".popup__edit-area").addEventListener("submit",(function(e){return te(e)})),S.addEventListener("click",(function(){return R(v)})),v.querySelector(".popup__edit-area").addEventListener("submit",(function(e){return ee(e)}));var W,X=function(e,t){var n=t.querySelector(".card__id").textContent;(e.target.classList.contains(x)?M:B)(n).then((function(n){return function(e,t,n){e.target.classList.toggle(x),z(n,t)}(e,n,t)})).catch((function(){return"Ошибка при нажатии на лайк"}))},Y=function(e,t){var n=t.querySelector(".card__id").textContent;(function(e){return fetch(O+"/".concat(e),{method:"DELETE",headers:A}).then((function(e){return j(e,"Ошибка удаления карточки")}))})(n).then((function(){return e.target.closest(".card").remove()})).catch((function(){return console.error("Ошибка удаления карточки ".concat(n))})).catch((function(){return"Ошибка при удалении карточки"}))},$=function(e){var t,n;e.preventDefault(),H(!0,c),(t=o.value,n=u.value,fetch(w,{method:"PATCH",headers:A,body:JSON.stringify({name:t,about:n})}).then((function(e){return j(e,"Ошибка обновлении информации о пользователе")}))).then((function(){a.textContent=o.value,s.textContent=u.value,V(e.target.closest(".popup"))})).catch((function(){return"Ошибка обновления информации о профиле"})).finally((function(){return H(!1,c)}))},ee=function(e){var n;e.preventDefault(),H(!0,h),(n=m.value,fetch(D,{method:"PATCH",headers:A,body:JSON.stringify({avatar:n})})).then((function(){l.src=m.value,V(e.target.closest(".popup")),e.target.reset(),t(S,"popup__submit-button_inactive")})).finally((function(){return H(!1,h)}))},te=function(e){var n,r,o;e.preventDefault(),H(!0,_),(r=d.value,o=f.value,fetch(O,{method:"POST",headers:A,body:JSON.stringify({name:r,link:o})}).then((function(e){return j(e,"Ошибка создания новой карточки")}))).then((function(e){return n=e._id,Z(e.name,e.link)})).then((function(e){return I(e,n)})).then(G).then((function(){V(e.target.closest(".popup")),e.target.reset(),t(_,"popup__submit-button_inactive")})).catch("Ошибка добавления карточки").finally((function(){return H(!1,_)}))};Promise.all([fetch(w,{headers:A}).then((function(e){return j(e,"Ошибка получения информации о пользователе")})),fetch(O,{headers:A}).then((function(e){return j(e,"Ошибка получения карточек")}))]).then((function(e){var t,n,r,o=e[0];U=o._id,t=o.avatar,n=o.name,r=o.about,a.textContent=n,s.textContent=r,l.src=t;var u=e[1];(u=u.map(N).sort(J)).forEach((function(e){var t;(t=e.link,new Promise((function(e,n){var r=new Image;r.src=t,r.onload=e,r.onerror=n}))).then((function(){return Z(e.name,e.link,X,Y,(function(){return function(e,t){E.src=t,E.alt=e,g.textContent=e,R(k)}(e.name,e.link)}))})).then((function(t){return I(t,e._id)})).then((function(t){return z(t,e.likes.length)})).then((function(t){return function(e,t,n){return t.map((function(e){return e._id})).includes(n)&&e.querySelector(".card__like").classList.add("card__like_active"),e}(t,e.likes,U)})).then((function(t){return function(e,t){return t||e.querySelector(".card__delete").remove(),e}(t,e.owner._id===U)})).then(F).catch((function(){return console.error("Изображение ".concat(e.name," по ссылке ").concat(e.link," не доступно."))}))}))})),W={formSelector:".popup__edit-area",inputSelector:".popup__input",submitButtonSelector:".popup__submit-button",inactiveButtonClass:"popup__submit-button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"},Array.from(document.querySelectorAll(W.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n(r,o,t.inactiveButtonClass),r.forEach((function(u){return u.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,u,t),n(r,o,t.inactiveButtonClass)}))}))}(e,W)}))})();