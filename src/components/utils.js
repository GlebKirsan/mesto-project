function checkImageAvailable(imageUrl) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageUrl;
        image.onload = resolve;
        image.onerror = reject;
    });
}

function parseDateInCard(card) {
    card.createdAt = new Date(card.createdAt);
    return card;
}

function sortCardsByDate(lhsCard, rhsCard) {
    return lhsCard.createdAt - rhsCard.createdAt
}

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = "Сохранить";
    }
}

export {checkImageAvailable, parseDateInCard, sortCardsByDate, renderLoading};