<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// import Resource "ProductResource"
use App\Http\Resources\ProductResource;

// import model "Product"
use App\Models\Product;

//import Facade "Validator"
use Illuminate\Support\Facades\Validator;

//import Facade "Storage"
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    function index()
    {
        $products = Product::all();

        return new ProductResource(true, 'List Data Products', $products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required',
            'price' => 'required',
            'stock' => 'required',
        ]);

        // check if  validation fails
        if ($validator->fails()) {
            return response()->json($validator->error(), 422);
        }

        // upload image
        $image = $request->file('image');
        $image->storeAs('public/products/' . $image->hashName());

        // created product

        $products = Product::create([
            'image' => $image->hashName(),
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);

        // return response
        return new ProductResource(true, 'Data Product Berhasil Ditambahkan', $products);
    }


    function show($id)
    {
        $product = Product::find($id);

        // return response
        return new ProductResource(true, 'DDetail Data Product', $product);
    }


    function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            // 'name' => 'required',
            'price' => 'required',
            'stock' => 'required',
        ]);

        // check if  validation fails
        if ($validator->fails()) {
            return response()->json($validator->error(), 422);
        }

        $product = Product::find($id);

        if ($request->hasFile('image')) {

            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());

            Storage::delete('public/products/' . basename($product->image));

            $product->update([
                'image' => $image->hashName(),
                'name' => $request->name,
                'price' => $request->price,
                'stock' => $request->stock,
            ]);
        } else {
            $product->update([
                'name' => $request->name,
                'price' => $request->price,
                'stock' => $request->stock,
            ]);
        }

        // return response
        return new ProductResource(true, 'Data Product Berhasil Diperbarui', $product);
    }

    function destroy($id)
    {
        $product = Product::find($id);

        Storage::delete('public/products/' . basename($product->image));

        $product->delete();

        return new ProductResource(true, 'Data Product Berhasil Dihapus', null);
    }
}
