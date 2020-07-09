function scrollToItem(id) {
    var item = document.getElementById(id);
    item.scrollIntoView({behavior: "smooth", block: "start"});
}
