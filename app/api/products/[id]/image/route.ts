import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id]/image
export async function GET(
  request: NextRequest,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        imageData: true,
        imageMimeType: true,
      },
    });
    
    if (!product || !product.imageData) {
      return new NextResponse(null, { status: 404 });
    }
    
    // Convert Bytes to Buffer
    const buffer = Buffer.from(product.imageData);
    
    // Create a new Response with the image data and appropriate content type
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': product.imageMimeType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil gambar' },
      { status: 500 }
    );
  }
}

// POST /api/products/[id]/image
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Get the multipart form data
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Tidak ada file gambar yang diberikan' },
        { status: 400 }
      );
    }
    
    // Size validation (limiting to 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Ukuran gambar melebihi batas 5MB' },
        { status: 400 }
      );
    }
    
    // Type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipe gambar tidak valid. Hanya JPEG, PNG, GIF, dan WebP yang diperbolehkan' },
        { status: 400 }
      );
    }
    
    // Convert the file to an ArrayBuffer and then to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate a URL where the image can be accessed
    const imageUrl = `/api/products/${productId}/image`;
    
    // Update the product with the image data
    await prisma.product.update({
      where: { id: productId },
      data: {
        imageData: buffer,
        imageMimeType: file.type,
        imageUrl: imageUrl, // Store the URL where the image can be accessed
      },
    });
    
    return NextResponse.json({ 
      success: true,
      imageUrl 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Gagal mengunggah gambar' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id]/image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const productId = parseInt(resolvedParams.id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID produk tidak valid' },
        { status: 400 }
      );
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      );
    }
    
    // Remove the image data
    await prisma.product.update({
      where: { id: productId },
      data: {
        imageData: null,
        imageMimeType: null,
        imageUrl: null,
      },
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Gambar berhasil dihapus' 
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus gambar' },
      { status: 500 }
    );
  }
}