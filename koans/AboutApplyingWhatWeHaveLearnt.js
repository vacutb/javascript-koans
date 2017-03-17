var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(prod) {return prod.containsNuts === false && _(prod.ingredients).all(function(x) {return x != "mushrooms"})});

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.reduce(_.range(1,1000,1), function(memo, num)
      { 
        if (num % 3 === 0 || num % 5 === 0)
          return memo + num;
        return memo; 
      }, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(_(_(products).map(function(prod) { return prod.ingredients})).flatten()).reduce( function(memo, ingredient) {ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1}, 0);


    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var number = 65765;
    getLargestPrimeFactor = function(n) {
      var largestPrimeFactor = 1, factor = 2;
      while (n > 1)
      {
        if (n % factor === 0)
        {
          largestPrimeFactor = factor;
          n = n / factor;
          while (n % factor === 0)
          {
            n = n / factor;
          }
        }
        factor += (factor === 2) ? 1 : 2; 
      }
      return largestPrimeFactor;
    }
    expect(getLargestPrimeFactor(number)).toBe(1879);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var palin = 0;
    /*for (var i = 100; i <= 999; i++)
    {
      for (var j=i; j<= 999; j++)
      {
        var val1 = i * j;
        var str = val1.toString();
        var reverse = str.split('').reverse().join('');
        if (str === reverse && palin < val1)
          palin = val1;
      }
    }*/

    makePalindrome = function(firstHalf)
    {
      var reverse = firstHalf.toString().split('').reverse().join('');
      return parseInt(firstHalf + reverse);
    }

    var found = false;
    var firstHalf = 998;
    var factors = [];
 
    while (!found) 
    {
      firstHalf--;
      palin = makePalindrome(firstHalf);
      for (var i = 999; i > 99; i--) 
      {
        if ((palin / i) > 999 || i*i < palin) {
            break;
        }

        if ((palin % i === 0)) 
        {
            found = true;
            factors[0] = palin / i;
            factors[1] = i;
            break;
        }
      }
    } 

    expect(palin).toBe(906609);
    
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    generatePrimes = function(upperLimit)
    {
      var primes = [];
      var isPrime;
      var j;
 
      primes.push(2);
 
      for (var i = 3; i <= upperLimit; i += 2) 
      {
        j = 0;
        isPrime = true;
        while (primes[j]*primes[j] <= i) 
        {
          if (i % primes[j] == 0) 
          {
              isPrime = false;
              break;
          }
          j++;
        }
        if (isPrime) 
        {
          primes.push(i);
        }
      }
      return primes;
    }

    var divisorMax = 20;
    var p = generatePrimes(divisorMax);
    var result = 1;

    for (var i = 0; i < p.length; i++) 
    {
      var a = Math.floor(Math.log(divisorMax) / Math.log(p[i]));
      result = result * (Math.pow(p[i],a));
    }

    expect(result).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sum = 0, squared = 0, result = 0;
    var N = 100;

    /*for (var i=1; i<=N;i++)
    {
      sum += i;
      squared += i*i;
    }
    */

    sum = N * (N+1)/ 2;
    squared = (N * (N + 1) * (2 * N + 1)) / 6;
    result = sum * sum - squared;

    expect(result).toBe(25164150);
    
  });

  it("should find the 10001st prime", function () {
    isPrime = function(numm) 
    {
      if (numm <= 1) {
          return false;
      }

      if(numm == 2){
          return true;
      }

      if (numm % 2 == 0) {
          return false;
      }

      var counter = 3;

      while ((counter * counter) <= numm) {
          if (numm % counter == 0) {
              return false;
          } else {
              counter +=2;
          }
      }

      return true;
    }

    var numPrimes = 1;
    var numm = 1;

    while (numPrimes < 10001) {
        numm = numm + 2;
        if (isPrime(numm)) {
            numPrimes++;
        }
    }
    
    expect(numm).toBe(104743);
  });
  
});
