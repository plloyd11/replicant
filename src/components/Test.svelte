<script>
    const secret = "ST_OGNlZmY1Y2UtOTUyYi00ZDA3LWI0OTktMjRjMWFlMTljNmJmNjM3NzQ0NDU4NDYwMzM1MzM2"
    let poop;

    async function getData(url) {
        const response = await fetch(url, {
                headers: {
                'Authorization': `Basic ${btoa(secret)}`,
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }

    getData(`https://app.snipcart.com/api/usersessions/${number}`).then(result => {
        console.log(result)
    })

</script>
<slot />
<h1>{poop} is logged in</h1>
