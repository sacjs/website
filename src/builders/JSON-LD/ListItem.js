export default function ListItemBuilder ({ item, position }) {
  return {
    '@type': 'ListItem',
    item,
    position
  }
}
