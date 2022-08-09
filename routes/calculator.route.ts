import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

const calcMain = (req: Request, res: Response) => {
    const { total, next, operation } = req.query as any;
    
    const totalNum: number | null = isNaN(total) ? null : Number(total);
    const nextNum: number | null = isNaN(next) ? null : Number(next);
    
    if (nextNum == null) {
        res.send(totalNum ? totalNum.toString() : "0");
        return;
    }
    switch (operation) {
        case "plus":
            res.send((totalNum as number + nextNum).toString());
            break;
        case "minus":
            res.send((totalNum as number - nextNum).toString());
            break;
        case "times":
            res.send((totalNum as number * nextNum).toString());
            break;
        case "divide":
            res.send((totalNum as number / nextNum).toString());
            break;
        default: {
            res.send(nextNum.toString());
            break;
        }
    }
};

router.get('/', calcMain);

export default router;