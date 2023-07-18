// İfade düğümü sınıfı
class PredicateNode {
    constructor(operator, left, right) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    evaluate(data) {
        switch (this.operator) {
            case 'AND':
                return this.left.evaluate(data) && this.right.evaluate(data);
            case 'OR':
                return this.left.evaluate(data) || this.right.evaluate(data);
            case 'NOT':
                return !this.right.evaluate(data);
            case '>':
                return this.left.evaluate(data) > this.right.evaluate(data);
            case '<':
                return this.left.evaluate(data) < this.right.evaluate(data);
            case '==':
                return this.left.evaluate(data) === this.right.evaluate(data);
            default:
                throw new Error('Geçersiz koşul operatörü: ' + this.operator);
        }
    }
}

// Değer düğümü sınıfı
class ValueNode {
    constructor(value) {
        this.value = value;
    }

    evaluate(data) {
        return this.value;
    }
}

// Örnek kullanım
const expressionTree = new PredicateNode('AND',
    new PredicateNode('>',
        new ValueNode(5),
        new ValueNode(3)
    ),
    new PredicateNode('OR',
        new PredicateNode('==',
            new ValueNode(10),
            new ValueNode(10)
        ),
        new PredicateNode('NOT',
            null,
            new ValueNode(true)
        )
    )
);

const data = {}; // Veri nesnesi, burada boş bir nesne kullanıyoruz

// Koşul ifadesini değerlendir
const result = expressionTree.evaluate(data);
console.log('Sonuç:', result);


function send(){
    const user = {
        name: "John Doe",
        email: "johndoe@example.com"
    };

    fetch("http://localhost:1323/profile/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(expressionTree)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("İstek başarısız: " + response.status);
            }
            console.log("İstek başarıyla gönderildi");
        })
        .catch(error => {
            console.error("İstek hatası:", error);
        });

}