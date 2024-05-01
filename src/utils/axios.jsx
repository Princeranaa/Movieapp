import axios from 'axios'

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3/",

    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjMyZjBjOWRhMDA2NDQwYmQ0NmEzNmE0OGMxMDVjYyIsInN1YiI6IjY2MjExMmFjZTRjOWViMDE2M2Y1M2RiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uNy9As4qgmoHht5hfTkLpz90bub3sRCmdNZMJ-VCOJk'
      }
});







export default instance;