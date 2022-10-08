<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $guarded = [];
    protected $appends = ['product_image_url'];

    public function getProductImageUrlAttribute() {
        return url(config('custom.PRODUCT_IMAGE_PATH').$this->attributes['image']);
    }

    public function getCreatedAtAttribute( $value ) {
       return $this->attributes['date'] = (new Carbon($value))->format('d/m/y');
    }
}
