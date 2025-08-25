function callCube(mid: number, n: number): number {
    let ans = 1;
    for (let i = 0; i < n; i++) {
        ans *= mid;
    }
    return ans;
}


function cubert(num: number, n: number): number{
    let low = 1;
    let high = num;
    let ans = 0;
    while(low<=high)
    {
        let mid = Math.floor((low+high)/2);
        if(callCube(mid, n)===num)
        {
            return mid;
        }
        if(callCube(mid, n)<num)
        {
            ans=mid;
            low=mid+1;
        }else{
            high=mid-1;
        }
    }
    return ans;
}