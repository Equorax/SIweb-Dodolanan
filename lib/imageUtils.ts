/**
 * Helper functions untuk menangani upload dan pengelolaan gambar
 */

// Upload gambar untuk produk
export async function uploadProductImage(productId: number, file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`/api/products/${productId}/image`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Gagal mengunggah gambar');
    }
    
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Hapus gambar untuk produk
export async function deleteProductImage(productId: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/products/${productId}/image`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Gagal menghapus gambar');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}