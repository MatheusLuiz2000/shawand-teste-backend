export default function(since) {
  return `http://localhost:4040/users?since=${since}&per_page=3`;
}
