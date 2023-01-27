const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find(
      (movie) => movie.mediaId.toString() === mediaId.toString()
    ) !== undefined
}

export default favoriteUtils
