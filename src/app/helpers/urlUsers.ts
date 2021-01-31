export default function(since) {
  return `${process.env.URL}users?since=${since}&per_page=3`;
}
