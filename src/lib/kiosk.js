export async function searchProducts(per_page) {

  const url = '/products/search';

  const postBody = {
    per_page: per_page
  };

  const requestMetadata = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  };

  const res = await fetch(url, requestMetadata);
  const result = await res.json();

  console.log("Product search result:\n%s", JSON.stringify(result));

  return result;
}

export async function deleteProduct(id) {

  console.log("Deleting product id: %s", id);

  const url = '/products/' + id;
  const requestMetadata = {
    method: 'DELETE',
  };

  const res = await fetch(url, requestMetadata)
  
  return res.status
}