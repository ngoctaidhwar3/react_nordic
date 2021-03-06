import React from 'react';
import './FilterPanel.css';
function FilterPanel({ filterPrice }) {

    return (<div id="accordion" className="FilterPanel">
        <div className="card">
            <div className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Bộ lọc sản phẩm
          </button>
                </h5>
            </div>

            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div className="card-body">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Mua trước trả sau</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                        <label className="form-check-label" htmlFor="exampleCheck2">Mua gói siêu hời</label>
                    </div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header" id="headingTwo">
                <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Theo khoảng giá
          </button>
                </h5>
            </div>
            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                <section className="range-slider">
                    <span className="rangeValues"></span>
                    <button onClick={() => filterPrice(1000000)} type="button">Dưới 1 triệu</button>
                    <button onClick={()=>filterPrice(2000000)} type="button">Từ 1 tới 2 triệu</button>
                </section>
            </div>
        </div>
        <div className="card">
            <div className="card-header" id="headingThree">
                <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Màu sắc
          </button>
                </h5>
            </div>
            <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
                <div className="card-body">
                    Thêm filter ở đây
                    </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header" id="heading4">
                <h5 className="mb-0">
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                        Kích thước
          </button>
                </h5>
            </div>
            <div id="collapse4" className="collapse show" aria-labelledby="heading4" data-parent="#accordion">
                <div className="card-body">
                    Thêm filter ở đây
                    </div>
            </div>
        </div>
    </div>)
}

export default FilterPanel;