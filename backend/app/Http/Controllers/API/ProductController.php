<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Http\Controllers\API\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product_list = Product::select('id','name','image','detail','created_at')->get();
        
        return $this->successJson('Product list fetch succesfully.', [
                'product_list' => $product_list,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        
        return $this->successJson('Product created succesfully.', [
                'product_list' => $product_list,
            ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $product = new Product;
        $product->name = $request->name;
        $product->detail = $request->detail;
        $product->created_by = Auth::user()->id;

        if (request()->hasFile('image')) {
            $file = request()->file('image');
            $fileName = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
            $file->move(config('custom.PRODUCT_IMAGE_PATH'), $fileName);
            $product->image=$fileName;
        }else {
            $product->image=0;
        }
        $product->save();

        return $this->successJson('Product created succesfully.', [
                'product' => $product,
            ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $prod = Product::find($id);
        // dd($prod);
        // $arr = array("status" => true, "message" => "show");
        // return response()->json($arr , 200);
        return $this->successJson('Product details succesfully.', [
                'product' => $prod,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // dd('edit');
        $prod  = Product::find($id);
        // $arr = array("status" => true, "message" => "edit");
        // return response()->json($arr , 200);
        return $this->successJson('Product details succesfully.', [
                'product' => $prod,
            ]);

        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        // dd($request->all());
        $product = Product::find($id);
        if(!$product){
            return $this->errorJson('Product Not found.', [
                'update' => "fail",
            ]);
        }else {
            $product->name = $request->name;
            $product->detail = $request->detail;
            $product->created_by = Auth::user()->id;
            // dd($product);
            
            if (request()->hasFile('image')) {
                
                if(!empty($product->image)){
                    //check wether image is stored or not, if stored then removed old image
                    $file= $product->image;
                    @unlink(config('custom.PRODUCT_IMAGE_PATH').$file);
                }
                $file = request()->file('image');
                $fileName = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
                $file->move(config('custom.PRODUCT_IMAGE_PATH'), $fileName);
                $product->image=$fileName;
            }
            $product->save();
            
            return $this->successJson('Product updated succesfully.', [
                'product' => $product,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // dd($id);
        $product = Product::find($id);
        if(!$product){
            return $this->errorJson('Product Not found.', [
                'deleted' => "fail",
            ]);
        }else {
            $file= $product->image;
            $filename = storage_path(config('custom.DELETE_PRODUCT_IMAGE_PATH')).$file;
            if(file_exists($filename)){
                @unlink($filename);
            }
            $product->delete();
            return $this->successJson('Product deleted succesfully.', [
                'deleted' => "done",
            ]);
        }
    }
}
