/**
 * Resolves if any of the passed in promises resolves.
 * @param {*} proms 
 */
export const someAsync = async (proms) => {
  let error;
  for (let i = 0; i < proms.length; i++) {
    try {
      const res = await proms[i];
      return res;
    } catch (err) {
      error = err;
    }
  }
  throw error;
}
