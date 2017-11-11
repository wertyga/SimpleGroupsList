const  baseUrl = 'https://webilesoft-backend.herokuapp.com';

export default {
    groups: `${baseUrl}/groups`,
    groupItems(id) { return `${baseUrl}/groups/items/${id}`},
    item(id) { return `${baseUrl}/items/${id}`}
}