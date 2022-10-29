let parameterCount = 0;

$("#add-parameter").click((e) => {
    parameterCount += 1;
    $("#parameters").append(`
        <div class="form-group mb-3" id="${parameterCount}">
            <div class="form-check-inline">
                <label class="form-check-label" for="fType${parameterCount}">Parameter Type</label>
                <select name="type"  class="fType" id="fType${parameterCount}">
                    <option value="bool">Bool</option>
                    <option value="int">Int</option>
                    <option value="uint">uInt</option>
                    <option value="int8">Int 8</option>
                    <option value="int16">Int 16</option>
                    <option value="int32">Int 32</option>
                    <option value="int64">Int 64</option>
                    <option value="int128">Int 128</option>
                    <option value="int256">Int 256</option>
                    <option value="uint8">uInt 8</option>
                    <option value="uint16">uInt 16</option>
                    <option value="uint32">uInt 32</option>
                    <option value="uint64">uInt 64</option>
                    <option value="uint128">uInt 128</option>
                    <option value="uint256">uInt 256</option>
                    <option value="float">Float</option>
                    <option value="string">String</option>
                    <option value="address">Address</option>
                    <option value="byte">Byte</option>
                </select>
            </div>
            <div class="form-check-inline">
                <label class="form-check-label" for="fValue${parameterCount}">Parameter Value</label>
                <input type="text" class="fValue" id="fValue${parameterCount}" required>
            </div>
            <div class="form-check-inline">
                <p class="btn btn-danger" onClick="removeParameter(${parameterCount})">Remove Parameter</p>
            </div>
        </div>
    `);
});

$(".btn-primary").click((e) => {
    e.preventDefault();

    // get call data from the form
    let address = $("#fAddress").val();
    let func = $('#fFunction').val();
    let value = $('#fValue').val();

    let parameters = [];

    $("#parameters").children().each((i) => {
        let x = $("#parameters").children()[i];
        let t = $(x).find(".fType").val();
        let v = $(x).find(".fValue").val();

        parameters.push({'type': t, 'value': v});
    });

    // construct the ABI for Web3Modal
    $.getJSON(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}`, function (data) {
        const contractABI = JSON.parse(data.result);
        console.log(contractABI)          
    });
})

function removeParameter(parameterID)
{
    $(`#${parameterID}`).remove();
}