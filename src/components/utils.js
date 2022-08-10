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

function sortCardsByDateDescending(lhsCard, rhsCard) {
    return rhsCard.createdAt - lhsCard.createdAt;
}

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = "Сохранить";
    }
}

function shortenNumber(number) {
    if (number > 1e3) {
        return Math.round(number / 1e3 * 10) / 10 + 'k';
    } else if (number > 1e6) {
        return Math.round(number / 1e6 * 10) / 10 + 'm';
    } else if (number > 1e9) {
        return Math.round(number / 1e9 * 10) / 10 + 'm';
    }
    return number;
}

const disableButton = button => {
    button.classList.add('popup__submit-button_inactive');
    button.disabled = true;
};

export {checkImageAvailable, parseDateInCard, sortCardsByDateDescending, renderLoading, shortenNumber, disableButton};