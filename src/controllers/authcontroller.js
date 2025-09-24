

export function test(req, res) {

    const data = [
  
   { 
      "id" : 1,
      "name" : "maooozine",
      "last_name" : "zougui"
   },
   { 
      "id" : 2,
      "name" : "yaaaaaassir",
      "last_name" : "zbida"
   },
   { 
      "id" : 3,
      "name" : "mohamed",
      "last_name" : "elqsoumi"
   }

]

    console.log(req.params.tester_id)
    const person_id = parseInt(req.params.tester_id)
    const persons = data.find((pers) => {
        return pers.id === person_id
    })
    res.status(200).render('index', { data: persons })
}