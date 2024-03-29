import math
import random
def cencode(text,key):
    output = []                                #make a clear buffer
    random.seed(key)                           #seed random (not used)
    for h in range(len(text)):                 # for every character:
        i = h + 1                              # (some indexing weirdness)
        output.append(                         # append to the buffer: 
            (ord(text[h])+cscramble(i,key))    #   text ascii value plus scrambler output
            %255)                              #   modulo 255 (should be 256 really, i should change this)
    return output                              

def cencodeh(text,key):
    output = ""
    random.seed(key)
    for h in range(len(text)):
        i = h + 1
        chara = hex((ord(text[h])+cscramble(i,key))%255)
        chara = chara[2:]
        while len(chara)<2:
            chara = "0" + chara
        output = output + chara
    return output

def cscramblem(iterate,key):
    interim = (iterate
            +(key%10)*iterate+math.floor(iterate/3)
            +iterate*2
            +math.floor(9*math.sin(math.radians(iterate*2)))
            +random.randint(0,200)
           )%255
    return interim+255

def cscramble64(iterate,key):
    interim = iterate
    interim += (key%10)*iterate
    interim += math.floor(iterate/3)
    interim += iterate*2
    interim += math.floor(9*math.sin(math.radians(iterate*2)))  #add 9sin(iterate*2) with the decimal point chopped off
    #interim += random.randint(0,200) #REMOVE!
    for i in range(6):
        interimb = math.sin(math.radians(key*2)) * (2**32) #make a very big number using key*2
        interimb = math.floor(interimb) #make it int
        interimb = interimb*3 ^ (iterate*7) #xor (iterate*7)
        interimc = interimb >> 5
        interimc = interimc << 5 #chop off a few bits
        interimd = interimc << 3 #make another one
        interime = interimb ^ interimc
        interime += interimd
        interim -= interime
    interim = interim % 255
    return interim+255
                      
def cscramble(ii,kk):
    #var a,b,c,d,e,f,r,j,expn;
    expn=16;
    k=kk&0xffffffff
    i=ii&0xffffffff
    a = i
    #print(a)
    a += ((k%10)*i)
    #print(a)
    a += math.floor(i/3)
    #print(a)
    a += (i*2)
    #print(a)
    r = math.sin(radians(i*2))
    r = r*9
    a += math.floor(r)
    #print(a)
    for j in range(6):
        #print("for")
        b=math.sin(radians(k*2))
        #print("b",b)
        b=b*(2**expn)
        #print("b",b)
        b=math.floor(b)
        #print("b",b)
        b=(b*3)^(i*7)
        b=b&0xffffffff
        #print("b",b)
        c=(b>>5)&0xffffffff
        #print("c",c)
        c=(c<<5)&0xffffffff
        #print("c",c)
        d=(c<<3)&0xffffffff
        #print("d",d)
        e=(b^c)
        #print("e",e)
        e=(e+d)
        #print("e",e)
        i=(i-e)
        #print("i",i)
    i=i%255
    return i
                       
def cdecode(array,key):
    output = ""
    random.seed(key)
    for h in range(len(array)):
        i = h + 1
        maths =(array[h]-cscramble(i,key))
        output = output + (chr(maths%255))
    return output

def cdecodeh(stringin,key):
    stredit = stringin.lower()
    if len(stringin)%2 == 1:
        stredit = "0" + stringin
    hexdigits = {"0" : 0 ,
                 "1" : 1 ,
                 "2" : 2 ,
                 "3" : 3 ,
                 "4" : 4 ,
                 "5" : 5 ,
                 "6" : 6 ,
                 "7" : 7 ,
                 "8" : 8 ,
                 "9" : 9 ,
                 "a" : 10 ,
                 "b" : 11 ,
                 "c" : 12 ,
                 "d" : 13 ,
                 "e" : 14 ,
                 "f" : 15}
    
    array = []                 
    for c in range(math.floor(len(stredit)/2)):
        ptr = c*2
        array.append((hexdigits[stredit[ptr]]*16)+hexdigits[stredit[ptr+1]])
        

    output = ""
    random.seed(key)
    for h in range(len(array)):
        i = h + 1
        maths =(array[h]-cscramble(i,key))
        output = output + (chr(maths%255))
    return output



#random.seed(5)
#for i in range(5):
#    print(random.randint(0,10000))




if __name__ == "__main__":
    # execute only if run as a script

    print(cdecode(cencode("hello", 1),1))
    a=cencode("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 1)
    for j in range(len(a)):
        print(" "*math.floor(a[j]/2)+"#")
